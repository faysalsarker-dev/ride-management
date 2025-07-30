import { Request, Response } from 'express';
import { RideService } from './ride.service';
import sendResponse from '../../utils/sendResponse';



export const RideController = {
  createRide: async (req: Request, res: Response) => {
    const ride = await RideService.createRide({...req.body, rider: req.user._id});
        sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Ride created successfully",
        data: ride,
      });
  },

  getAllRides: async (_req: Request, res: Response) => {
    const rides = await RideService.getAllRides();
       sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Rides retrieved successfully",
        data: rides,
      });
  },

  getSingleRide: async (req: Request, res: Response) => {
    const ride = await RideService.getSingleRide(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Ride retrieved successfully",
      data: ride,
    });
  },

  updateRideStatus: async (req: Request, res: Response) => {
    const ride = await RideService.updateRideStatus(req.params.id, req.body.status);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Ride status updated successfully",
      data: ride,
    });
  },

  deleteRide: async (req: Request, res: Response) => {
    await RideService.deleteRide(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Ride deleted successfully",
    });
  },
};
