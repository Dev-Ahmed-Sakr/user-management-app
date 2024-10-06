// import { Injectable } from '@angular/core';
// import {
//   HttpEvent,
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, switchMap } from 'rxjs/operators';
// import { AuthService } from './auth.service'; // Import your AuthService

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   constructor(private authService: AuthService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('token');

//     // Clone the request to add the authorization header with the token
//     let authReq = req;
//     if (token) {
//       authReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }

//     // Handle the request
//     return next.handle(authReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         // If the token is expired (401 Unauthorized), try to refresh the token
//         if (error.status === 401 && error.error.error === 'invalid_token') {
//           // Token expired, refresh the token
//           return this.authService.refreshToken().pipe(
//             switchMap((newToken: any) => {
//               localStorage.setItem('token', newToken.accessToken); // Store new access token

//               // Retry the failed request with the new token
//               const retryReq = req.clone({
//                 setHeaders: {
//                   Authorization: `Bearer ${newToken.accessToken}`
//                 }
//               });

//               return next.handle(retryReq); // Retry the request with the new token
//             })
//           );
//         }

//         return throwError(error); // If not a 401 error or refresh fails, return the error
//       })
//     );
//   }
// }
