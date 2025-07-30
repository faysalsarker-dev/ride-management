import { Types } from "mongoose";

export type RideStatus =
  | 'requested'
  | 'accepted'
  | 'picked_up'
  | 'in_transit'
  | 'completed'
  | 'cancelled_by_rider'
  | 'cancelled_by_driver';

export interface IRide extends Document {
  rider: Types.ObjectId;
  driver?: Types.ObjectId;
  status: RideStatus;
  pickupLocation: {
    lat: number;
    lng: number;
    address?: string;
  };
  destinationLocation: {
    lat: number;
    lng: number;
    address?: string;
  };
  fare?: number;
  timestamps: {
    requestedAt: Date;
    acceptedAt?: Date;
    pickedUpAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;
  };
}