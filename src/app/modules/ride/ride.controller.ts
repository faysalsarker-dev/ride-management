import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { RiderService } from './ride.service';
import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

export const RideController = {
  createRide: catchAsync(async (req: Request, res: Response) => {
    const result = await RiderService.createRide({ ...req.body, rider: req.user._id });
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Ride created successfully!',
      data: result,
    });
  }),

  getAllRides: catchAsync(async (req: Request, res: Response) => {
    const result = await RiderService.getAllRides(req.user._id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All rides fetched successfully!',
      data: result,
    });
  }),

  getSingleRide: catchAsync(async (req: Request, res: Response) => {
    const { rideId } = req.params;
    const result = await RiderService.getSingleRide(rideId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Ride details retrieved successfully!',
      data: result,
    });
  }),

  updateRide: catchAsync(async (req: Request, res: Response) => {
    const { rideId } = req.params;
    const result = await RiderService.updateRide(req.user._id, rideId, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Ride updated successfully!',
      data: result,
    });
  }),

  deleteRide: catchAsync(async (req: Request, res: Response) => {
    const { rideId } = req.params;
    const result = await RiderService.deleteRide(req.user._id, rideId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Ride deleted successfully!',
      data: result,
    });
  }),

  cancelRide: catchAsync(async (req: Request, res: Response) => {
    const { rideId } = req.params;
    const result = await RiderService.cancelRide(rideId, req.user.role, req.user._id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Ride cancelled successfully!',
      data: result,
    });
  }),

  acceptRide: catchAsync(async (req: Request, res: Response) => {
    const { rideId } = req.params;
    const result = await RiderService.driverAcceptRide(rideId, req.user._id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Ride accepted successfully!',
      data: result,
    });
  }),

  updateRideStatus: catchAsync(async (req: Request, res: Response) => {
    const { rideId } = req.params;
    const status  = req.body.status;
    const result = await RiderService.updateRideStatus(rideId, status);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Ride status updated to ${status}`,
      data: result,
    });
  }),

  getAvailableRides: catchAsync(async (_req: Request, res: Response) => {
    console.log('Fetching available rides...');
    const result = await RiderService.getAvailableRides();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available rides fetched successfully!',
      data: result,
    });
  }),
};
