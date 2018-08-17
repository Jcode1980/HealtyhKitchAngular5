export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  dob?: number;
  country?: string;
  avatarLink?: string;
  justUpdated?: boolean;
}
