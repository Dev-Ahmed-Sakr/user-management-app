export class User {
    id: number = -1; // Optional because it won't be present for new users
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phoneNumber: string = '';
    address: string= '';
    password: string= '';
    zipCode: string= '';
    userTypeId: number=  0; // Assuming you have UserTypeId as integer
  }