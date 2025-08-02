import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { AdminUserService } from './admin.service';
import sendResponse from '../../utils/sendResponse';

export const AdminUserController = {
  getAllUsers: catchAsync(async (_req: Request, res: Response) => {
    const users = await AdminUserService.getAllUsers();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All users fetched successfully',
      data: users,
    });
  }),

  getAllDrivers: catchAsync(async (_req: Request, res: Response) => {
    const drivers = await AdminUserService.getAllDrivers();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All drivers fetched successfully',
      data: drivers,
    });
  }),

  updateUserById: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await AdminUserService.updateUserById(id, updateData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  }),


  updateApprovalStatus: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isApproved } = req.body;

    const updatedDriver = await AdminUserService.updateApprovalStatus(id, isApproved);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Driver approval status updated to ${isApproved}`,
      data: updatedDriver,
    });
  },







  getSummary: catchAsync(async (req: Request, res: Response) => {

    const summary = await AdminUserService.getSummary();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'data summary fetched successfully',
      data: summary,
    });
  }),
};
