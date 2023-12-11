import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/shared/firestore.service';
import { FireStorageService } from 'src/app/shared/fire-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  selectedFile: File | null = null;
  userId: string | null = null;
  userImage: string | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private storageService: FireStorageService,
    private userService: UserService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = null;
      }
    });
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.fetchUserImage(this.userId);
      } else {
        this.userId = null;
        this.userImage = null;
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  async onSubmit() {
    if (this.selectedFile && this.userId) {
      const storageCollection = `userProfiles/${this.userId}`;
      try {
        const task = await this.storageService.uploadFile(storageCollection, this.selectedFile);
        const fileRef = this.storage.ref(task.ref.fullPath);
        const url = await this.storageService.generateFileURL(fileRef);
        this.updateUserProfileImage(url);
      } catch (error) {
        console.error('Error during file upload:', error);
      }
    }
  }

  updateUserProfileImage(imageUrl: string) {
    if (this.userId) {
      this.db.doc(`users/${this.userId}`).update({ profileImg: imageUrl })
        .then(() => {
          console.log('Profile image updated successfully');
        })
        .catch(error => {
          console.error('Error updating profile image:', error);
        });
    }
  }

  fetchUserImage(userId: string) {
    this.userService.getUserImgPath(userId).subscribe(imgPath => {
      this.userImage = imgPath || null;
    });
  }
}
