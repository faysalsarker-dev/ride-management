export const UserRoles = {
  RIDER: 'RIDER',
  DRIVER: 'DRIVER',
  ADMIN: 'ADMIN',
} as const;


export type UserRole = 'RIDER' | 'DRIVER' | 'ADMIN';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isBlocked: boolean;
  isApproved?: boolean;
  isOnline?: boolean;
    comparePassword(candidatePassword: string): Promise<boolean>;

}