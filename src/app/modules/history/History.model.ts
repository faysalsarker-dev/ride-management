import { Schema, model } from 'mongoose';

const HistorySchema = new Schema(
  {
    rideId: { type: Schema.Types.ObjectId, ref: 'Ride', required: true },
    riderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    driverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    riderRating: { type: Number, min: 1, max: 5,default:null },
    riderFeedback: {type:String,default:''},
    driverRating: { type: Number, min: 1, max: 5,default:null },
    driverFeedback: {type:String,default:''},

    status: {
      type: String,
      enum: ['COMPLETED', 'CANCELLED', 'REJECTED'],
      default: 'COMPLETED',
    },
    completedAt: Date,
  },
  { timestamps: true }
);



export const History = model('History', HistorySchema);
