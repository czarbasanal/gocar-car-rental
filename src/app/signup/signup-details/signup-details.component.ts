import { Component } from '@angular/core';
import { SignupCommunicationService, UserDetailsWithFile } from 'src/app/shared/signup-communication.service';
import { UserDetails } from '../../shared/user-details.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup-details',
  templateUrl: './signup-details.component.html',
  styleUrls: ['./signup-details.component.css']
})

export class SignupDetailsComponent {
  constructor(private signupCommunicationService: SignupCommunicationService, private snackBar: MatSnackBar) { }

  uploadedFileName: string = '';
  selectedFile!: File;

  userDetails: UserDetails = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    licenseImg: '',
    profileImg: '',
    notifications: [],
    favorites: [],
    myRentedCars: [],
  };

  userDetailsWithFile: UserDetailsWithFile = {
    userDetails: this.userDetails,
    file: this.selectedFile,
  }


  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.userDetailsWithFile.file = this.selectedFile;
      this.uploadedFileName = file.name;
    }
  }

  onFormSubmit(event: Event) {

    if (this.userDetailsWithFile.userDetails.lastname == '') {
      this.snackBar.open('Please enter your last name.', 'Close', { duration: 2000 });
      return;
    }
    if (this.userDetailsWithFile.userDetails.firstname == '') {
      this.snackBar.open('Please enter your first name.', 'Close', { duration: 2000 });
      return;
    }
    // if (this.userDetailsWithFile.file) {
    //   alert("Please upload your Driver's License");
    //   return;
    // }
    event.preventDefault();
    this.signupCommunicationService.notifyDetailsButtonClick(this.userDetailsWithFile);
  }
}
