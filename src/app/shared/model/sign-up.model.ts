export interface UserInformation {
  firstName: string;
  lastName: string;
  email: string;
}
export interface SignUpInformation extends UserInformation {
  password: string;
}
