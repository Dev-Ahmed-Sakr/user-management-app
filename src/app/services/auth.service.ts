import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service'; // Import StorageService
import { environment } from '../../environments/environment'; // Adjust the path if necessary
import { UserRole } from '../Enums/UserRole';
import { Router } from '@angular/router';
import { LocalStorageEnum } from '../Enums/LocalStorageEnum';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private apiUrl = `${environment.apiUrl}/auth`
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private storage: StorageService,private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout() {
    this.storage.removeItem(LocalStorageEnum.Access_Token); // Remove the token or other user data
   // this.storage.removeItem('refreshToken');
    this.router.navigate(['/login']); // Redirect to the login page
  }
  // Method to refresh the token
  // refreshToken(): Observable<any> {
  //   // const refreshToken = localStorage.getItem('refreshToken'); // Get the refresh token from storage
  //   // return this.http.post<any>(`${this.apiUrl}/refresh-token`, { refreshToken });
  // }
  isAuthenticated(): boolean {
    const token = this.storage.getItem(LocalStorageEnum.Access_Token); // Use StorageService
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getUserRoleFromToken(token: string): string {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken ? decodedToken.role : '';
  }
  isAdmin() {
    const token = localStorage.getItem(LocalStorageEnum.Access_Token);
    const userRole = this.getUserRoleFromToken(token ?? '');
    return userRole === UserRole.Admin;
  }
  isModerator() {
    const token = localStorage.getItem(LocalStorageEnum.Access_Token);
    const userRole = this.getUserRoleFromToken(token ?? '');
    return userRole === UserRole.Moderator
  }
  
}
