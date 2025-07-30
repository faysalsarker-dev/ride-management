import { ApiError } from "../../errors/ApiError";
import { IRide } from "./ride.interface";
import { Ride } from "./Ride.model";


export const RideService = {

  createRide: async (payload: Partial<IRide>) => {
    return await Ride.create({
      ...payload,
      
      timestamps: { requestedAt: new Date() },
    });
  },

  getAllRides: async () => {
    return await Ride.find().populate('rider').populate('driver');
  },

  getSingleRide: async (id: string) => {
    const ride = await Ride.findById(id).populate('rider').populate('driver');
    if (!ride) {
      throw new ApiError(404,'Ride not found');
    }
    return ride;
  },

  updateRideStatus: async (id: string, status: string) => {
    const updateData: any = { status };
    const timeStampKey = `${status}At`;

    if (['accepted', 'picked_up', 'completed'].includes(status)) {
      updateData[`timestamps.${timeStampKey}`] = new Date();
    }

    return await Ride.findByIdAndUpdate(id, updateData, { new: true });
  },

  deleteRide: async (id: string) => {
    const ride = await Ride.findByIdAndDelete(id);
    if (!ride) {
      throw new ApiError(404, 'Ride not found');
    }
    return ride;
  },
};
