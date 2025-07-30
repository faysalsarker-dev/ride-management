import { model, Schema } from "mongoose";
import { IRide } from "./ride.interface";

const rideSchema = new Schema<IRide>(
  {
    rider: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: [
        'requested',
        'accepted',
        'picked_up',
        'in_transit',
        'completed',
        'cancelled_by_rider',
        'cancelled_by_driver',
      ],
      default: 'requested',
    },
    pickupLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String },
    },
    destinationLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String },
    },
    fare: {
      type: Number,
    },
    timestamps: {
      requestedAt: {
        type: Date,
        default: Date.now,
      },
      acceptedAt: Date,
      pickedUpAt: Date,
      completedAt: Date,
      cancelledAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Ride = model<IRide>('Ride', rideSchema);