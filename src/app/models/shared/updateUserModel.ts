export class updateUserModel {
    Id: number = -1; // Optional because it won't be present for new users
    FirstName: string = '';
    LastName: string = '';
    Email: string = '';
    PhoneNumber: string = '';
    Address: string= '';
    zipCode: string= '';
    UserTypeId: number =  0; // Assuming you have UserTypeId as integer
  }