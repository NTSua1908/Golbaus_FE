import Role from '../enums/Role';

export interface UserGetByToken {
  fullName: string | null;
  avatar: string | null;
  userName: string | null;
  role: Role | null;
}
