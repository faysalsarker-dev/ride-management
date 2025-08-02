import { Schema, model } from 'mongoose';
import { IEarning } from './earnings.interface';

const earningsSchema = new Schema<IEarning>(
  {
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ride: {
      type: Schema.Types.ObjectId,
      ref: 'Ride',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    earnedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);

export const Earning = model<IEarning>('Earning', earningsSchema);
