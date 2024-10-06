import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { addUserModel } from '../../models/shared/addUserModel';
import { CommonModule } from '@angular/common';
import { SwalService } from '../../services/SwalService';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  userForm: FormGroup;
  usermodel!: addUserModel;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private swalService: SwalService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/),
        ],
      ], // USA Phone Number
      address: [''],
      zipCode: [
        '',
        [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)],
      ], // ZIP code pattern
      password: ['', [Validators.required, Validators.minLength(8)]],
      userTypeId: [1, Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Check if the user is an Admin
      if (this.authService.isAdmin()) {
        this.usermodel = this.userForm.value;
        this.userService.createUser(this.usermodel).subscribe((user) => {
          this.swalService.alertWithSuccess('User created successfully!');
          //alert('User created successfully!');
          this.router.navigate(['/user-management']); // Redirect to user management page
        });
      } else {
        this.swalService.alertWithError('Only admins can create users.');
        //alert('Only admins can create users.');
      }
    }
  }

}
