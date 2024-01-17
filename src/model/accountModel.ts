import Gender from "../enums/Gender";
import Role from "../enums/Role";

export interface UserGetByToken {
  id: string;
  fullName: string | null;
  avatar: string | null;
  userName: string | null;
  role: Role | null;
}

export interface UserProfileModel {
  avatar: string | null;
  fullName: string;
  userName: string;
  gender: Gender;
  dob: Date | null;
  dateJoined: Date;
  bio: string | null;
}

export interface RegisterModel {
  FullName: string;
  UserName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
}
