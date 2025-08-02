import { Types } from 'mongoose';
import { Ride } from './Ride.model';
import { Earning } from '../earnings/earnings.model';
import { IRide, RideStatus } from './ride.interface';
import { calculateFare } from '../../utils/calculateFare';
import { ApiError } from '../../errors/ApiError';

export const RiderService = {
  createRide: async (payload: Partial<IRide>) => {

if(!payload.rider) {
  throw new ApiError(400, 'Rider information is required.');
}

const isRiderInRide = await Ride.findOne({
      rider: payload.rider,
      status: { $in: [RideStatus.Requested, RideStatus.Accepted] },
    });
if (isRiderInRide?.status === RideStatus.Requested) {
      throw new ApiError(400, 'You already requested for a ride and it is still pending.');
    }else if (isRiderInRide?.status === RideStatus.Accepted) {
      throw new ApiError(400, 'You already accepted a ride and it is still pending.');
    }

    const { pickupLocation, destinationLocation } = payload;

    if (!pickupLocation || !destinationLocation) {
      throw new ApiError(400, 'Pickup and destination locations are required.');
    }

    const distance = calculateFare(
      pickupLocation.lat,
      pickupLocation.lng,
      destinationLocation.lat,
      destinationLocation.lng
    );

    const fare = Math.ceil(distance * 20);

    const newRide = await Ride.create({
      ...payload,
      fare,
    });

    return newRide;
  },

  getAllRides: async (riderId: string) => {
    return Ride.find({ rider: new Types.ObjectId(riderId) })
      .populate('driver', 'name email')
      .sort({ createdAt: -1 });
  },

  getSingleRide: async (rideId: string) => {
    return Ride.findOne({
      _id: rideId,
    }).populate('driver', 'name email');
  },

  updateRide: async (riderId: string, rideId: string, updateData: Partial<IRide>) => {
    const ride = await Ride.findOneAndUpdate(
      { _id: rideId, rider: new Types.ObjectId(riderId) },
      updateData,
      { new: true }
    );


    return ride;
  },

  deleteRide: async (riderId: string, rideId: string) => {
    const ride = await Ride.findOneAndDelete({
      _id: rideId,
      rider: new Types.ObjectId(riderId),
    });

   

    return ride;
  },

  updateRideStatus: async (rideId: string, status: RideStatus) => {
    const update: any = { status };

    const statusTimeMap: Record<string, string> = {
      [RideStatus.Accepted]: 'acceptedAt',
      [RideStatus.PickedUp]: 'pickedUpAt',
      [RideStatus.Completed]: 'completedAt',
      [RideStatus.CancelledByDriver]: 'cancelledAt',
      [RideStatus.CancelledByRider]: 'cancelledAt',
    };

    const timelineKey = statusTimeMap[status];
    if (timelineKey) {
      update[`rideTimeline.${timelineKey}`] = new Date();
    }

    const updatedRide = await Ride.findByIdAndUpdate(rideId, update, {
      new: true,
    });

    

    return updatedRide;
  },

  cancelRide: async (
    rideId: string,
    cancelledBy: 'rider' | 'driver' | 'admin',
    userId: string
  ) => {
    const ride = await Ride.findById(rideId);

    if (!ride) throw new Error('Ride not found');
    if (
      (cancelledBy === 'rider' && ride.rider.toString() !== userId) ||
      (cancelledBy === 'driver' && ride.driver?.toString() !== userId)
    ) {
      throw new Error('Unauthorized cancellation');
    }

    const status =
      cancelledBy === 'rider'
        ? RideStatus.CancelledByRider
        : RideStatus.CancelledByDriver;

    ride.status = status;
    ride.cancelledBy = cancelledBy;
    if (!ride.rideTimeline) {
      ride.rideTimeline = {};
    }
    ride.rideTimeline.cancelledAt = new Date();

    await ride.save();

    return ride;
  },

  driverAcceptRide: async (rideId: string, driverId: string) => {
    const isDriving = await Ride.findOne({
      driver: new Types.ObjectId(driverId),
      status: { $in: [RideStatus.Accepted, RideStatus.PickedUp, RideStatus.InTransit] },
    });
    if (isDriving) {
      throw new ApiError(400, 'You are already driving another ride.');
    }
    return Ride.findOneAndUpdate(
      { _id: rideId, status: RideStatus.Requested },
      {
        driver: driverId,
        status: RideStatus.Accepted,
        'rideTimeline.acceptedAt': new Date(),
      },
      { new: true }
    );
  },


  getAvailableRides: async () => {
    return Ride.find({ status: RideStatus.Requested })
      .populate('rider', 'name email')
      .sort({ createdAt: -1 });
  }
};
