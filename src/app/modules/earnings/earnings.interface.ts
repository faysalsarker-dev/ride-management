import { Types } from 'mongoose';

export interface IEarning {
  _id?: string;
  driver: Types.ObjectId;
  ride: Types.ObjectId;
  amount: number;
  earnedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
