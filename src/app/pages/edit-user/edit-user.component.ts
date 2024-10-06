import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SwalService } from '../../services/SwalService';
import { updateUserModel } from '../../models/shared/updateUserModel';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],  // Manually import ReactiveFormsModule and FormsModule  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements  OnInit {
  user: updateUserModel = new updateUserModel();
  userId: number = 0;
  editUserForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private swalService: SwalService,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    // Get the user ID from the route parameters
     
    var res = this.route.snapshot.paramMap.get('id');
    this.userId = res == null ?0 : +res;
    this.initializeForm();

    this.userService.getUserById(this.userId).subscribe((user) => {
    //  console.log(user);
      this.editUserForm.patchValue({
        firstName: user.data['firstName'],
        lastName: user.data.lastName,
        email: user.data.email,
        phoneNumber: user.data.phoneNumber,
        address: user.data.address,
        zipCode:user.data.zipCode,
        userTypeId: user.data.userTypeId
      });
    });
  }
  initializeForm() {
    this.editUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phoneNumber: ['', [Validators.required,Validators.pattern(/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],  // USA Phone Number
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],  // ZIP code pattern
      userTypeId: ['', Validators.required]
    });
  }

  updateUser() {
    if (this.editUserForm.valid) {
       debugger;
      const updatedUser = this.editUserForm.value;
      updatedUser.Id = this.userId;
      this.userService.updateUser(updatedUser).subscribe(
        (data) => {
          console.log(data);
         // alert('User updated successfully!');
          this.swalService.alertWithSuccess('User updated successfully');
          this.router.navigate(['/user-management']); // Redirect to user management or another page
        },
        (error) => {
          console.log(error);
          // console.error('Error updating user:', error);
          //alert('Failed to update user.');
          this.swalService.alertWithError('Failed to update user.')
        }
      );
    }
  }
  // Load the existing user data for editing
  loadUserData() {
     
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user = user.data;
        console.log(this.user);
      },
      error: (err) => {
        this.swalService.alertWithError('Failed to load user data.');
      }
    });
  }

  // Submit the updated user data
  // updateUser() {
  //   this.userService.updateUser(this.user).subscribe({
  //     next: () => {
  //       this.swalService.alertWithSuccess('User updated successfully!');
  //       this.router.navigate(['/user-management']); // Redirect after success
  //     },
  //     error: () => {
  //       this.swalService.alertWithError('Failed to update user.');
  //     }
  //   });
  // }
}
