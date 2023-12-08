import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(private storage: AngularFireStorage) { }

  async upload(file: File): Promise<string> {
    const filePath = `car-catalogue/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    await firstValueFrom(task.snapshotChanges().pipe(finalize(() => { })));
    const url = await firstValueFrom(fileRef.getDownloadURL());
    return url;
  }

  async delete(fileUrl: string): Promise<void> {
    const fileRef = this.storage.refFromURL(fileUrl);
    await firstValueFrom(fileRef.delete());
  }
}
