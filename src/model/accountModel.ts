import Role from '../enums/Role';

export interface UserGetByToken {
  FullName: string;
  Avatar: string;
  UserName: string;
  Role: Role;
}
