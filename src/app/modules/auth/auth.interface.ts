export const UserRoles = {
  RIDER: 'rider',
  DRIVER: 'driver',
  ADMIN: 'admin',
} as const;


export type UserRole = 'admin' | 'rider' | 'driver';

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