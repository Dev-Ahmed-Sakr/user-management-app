import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/shared/User';
import { SwalService } from '../../services/SwalService';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],  // Manually import ReactiveFormsModule and FormsModule
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  isEditing = false;
  currentUserId: number | null = null;

  constructor(private authService: AuthService,private userService: UserService,
             private fb: FormBuilder,private router: Router,   
             private swalService: SwalService) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phoneNumber: ['', [Validators.required]], //Validators.pattern('\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}')]],  // USA Phone Number
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],  // ZIP code pattern
      password: ['', [Validators.required, Validators.minLength(8)]],
      userTypeId: [1, Validators.required] // Assuming a default user type, modify as needed
    });

  }

// Add this method to navigate to the Add User page
navigateToAddUser() {
  this.router.navigate(['/add-user']);
}
  ngOnInit(): void {
    this.loadUsers();
    }

    isAdmin(){
      return this.authService.isAdmin()
    }
    isModerator(){
      return this.authService.isModerator()
    }
    loadUsers() {
      this.userService.getUsers().subscribe(users => {
        this.users = users.data;
      });
    }
  
    editUser(id: number) {
      this.router.navigate(['/edit-user', id]); // Navigate to Edit User page with user id

    }
  
    deleteUser(id: number) {
      // Check if the user is an Admin
      if (this.authService.isAdmin()) {
        this.userService.deleteUser(id).subscribe(() => {
          this.loadUsers();
        });
      } else {
        this.swalService.alertWithError('Only admins can delete users.');
        //alert('Only admins can delete users.');
      }
    }
  
    resetForm() {
      this.userForm.reset();
      this.isEditing = false;
      this.currentUserId = null;
    }

    logout() {
      this.authService.logout();
    }
}
