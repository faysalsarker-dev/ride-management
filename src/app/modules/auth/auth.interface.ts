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
    driverProfile?: {
    isApproved?: boolean;
    isOnline?: boolean;
    vehicleInfo?: {
      model?: string;
      licensePlate?: string;
      color?: string;
    };
  }
    comparePassword(candidatePassword: string): Promise<boolean>;

}