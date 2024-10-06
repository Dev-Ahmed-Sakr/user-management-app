import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Adjust the path if necessary
import { StorageService } from './storage.service';
import { User } from '../models/shared/User';
import { updateUserModel } from '../models/shared/updateUserModel';
import { addUserModel } from '../models/shared/addUserModel';
import { ResponseDTO } from '../models/shared/ResponseDTO';
import { LocalStorageEnum } from '../Enums/LocalStorageEnum';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/User`; // Use the environment variable

  constructor(private http: HttpClient, private storage : StorageService) {}

    // Helper function to create HTTP headers with the authorization token
    private createAuthorizationHeader(): HttpHeaders {
      const token = this.storage.getItem(LocalStorageEnum.Access_Token);
      let headers = new HttpHeaders();
      if (token) {
        headers = headers.append("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  // Create a new user (Admin only)
  createUser(user: addUserModel): Observable<ResponseDTO> {

    const headers = this.createAuthorizationHeader();
    return this.http.post<ResponseDTO>(this.apiUrl, user,{headers});
  }

  // Get all users (Admin and Moderator can access)
  getUsers(): Observable<ResponseDTO> {

    const headers = this.createAuthorizationHeader();
    return this.http.get<ResponseDTO>(this.apiUrl,{headers});
  }

  // Get a user by ID
  getUserById(id: number): Observable<ResponseDTO> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<ResponseDTO>(`${this.apiUrl}/${id}`,{headers}); 
  }

  // Update a user (Admin and Moderator can update)
  updateUser(user: updateUserModel): Observable<ResponseDTO> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<ResponseDTO>(`${this.apiUrl}`, user,{headers});
  }

  // Delete a user (Admin only)
  deleteUser(id: number): Observable<ResponseDTO> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<ResponseDTO>(`${this.apiUrl}/${id}`,{headers});
  }
}
