import { Component } from '@angular/core';
import { SignupCommunicationService } from '../signup-communication.service';
import { UserDetails } from '../shared/user-details.model';

@Component({
  selector: 'app-signup-details',
  templateUrl: './signup-details.component.html',
  styleUrls: ['./signup-details.component.css']
})

export class SignupDetailsComponent {
  userDetails: UserDetails = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    imagePath: ''
  };

  uploadedFileName: string = '';

  constructor(private signupCommunicationService: SignupCommunicationService) { }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      const imageName = file.name;
      const imagePath = `assets/photos/${imageName}`;
      this.userDetails.imagePath = imagePath;
      this.uploadedFileName = imageName;
    }
  }

  onFormSubmit(event: Event) {
    if (this.userDetails.lastname == '') {
      alert('Please enter your Lastname');
      return;
    }
    if (this.userDetails.firstname == '') {
      alert('Please enter your Firstname');
      return;
    }
    if (this.userDetails.imagePath == '') {
      alert("Please upload your Driver's License");
      return;
    }
    event.preventDefault();
    this.signupCommunicationService.notifyDetailsButtonClick(this.userDetails);
  }
}
