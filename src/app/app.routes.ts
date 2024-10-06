import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AuthGuard } from './guards/auth.guard';  // Auth Guard to protect routes
import { AddUserComponent } from './pages/add-user/add-user.component'; // Import the new component
import { EditUserComponent } from './pages/edit-user/edit-user.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] }, // Add new route
  { path: 'edit-user/:id', component: EditUserComponent }, // Route for Edit User
  { path: 'access-denied', component: AccessDeniedComponent }
];
