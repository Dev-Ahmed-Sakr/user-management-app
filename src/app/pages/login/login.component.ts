import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageEnum } from '../../Enums/LocalStorageEnum';
import { SwalService } from '../../services/SwalService';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],  // Manually import ReactiveFormsModule and FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
     private authService: AuthService, 
     private router: Router,
     private swalService: SwalService,
     private Storage :StorageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe(
        (res: any) => {
          // Check if the response contains a token
          if (res && res.token) {
            this.Storage.setItem(LocalStorageEnum.Access_Token, res.token);
            // this.Storage.setItem(LocalStorageEnum.refreshToken, res.refreshToken);
            this.router.navigate(['/user-management']);
          } else {
            // Handle unexpected response structure
            console.error('Unexpected response structure', res);
            this.swalService.alertWithError('Login failed: Invalid response from server.')
            //alert('Login failed: Invalid response from server.');
          }
        },
        (error) => {
          // Handle specific error messages based on server response
          console.error('Login failed', error);
          if (error.status === 401) {
            // Unauthorized
            //alert('Login failed: Invalid username or password.');
            this.swalService.alertWithError('Login failed: Invalid username or password.')
          } else if (error.status === 0) {
            // Network error
            this.swalService.alertWithError('Login failed: Unable to connect to the server. Please try again later.')
            //alert('Login failed: Unable to connect to the server. Please try again later.');
          } else {
            // Other errors
            this.swalService.alertWithError('Login failed: ' + (error.error.message || 'An unexpected error occurred.'));
            //alert('Login failed: ' + (error.error.message || 'An unexpected error occurred.'));
          }
        }
      );
    } else {
      this.swalService.alertWithError('Login failed: Please enter a valid username and password.');
      //alert('Login failed: Please enter a valid username and password.');
    }
  }
  

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
