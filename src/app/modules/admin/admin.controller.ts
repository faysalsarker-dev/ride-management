import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { AdminService } from './admin.service';
import sendResponse from '../../utils/sendResponse';

export const AdminController = {
  // ✅ Get all users with filters
  getUsers: catchAsync(async (req: Request, res: Response) => {
    const users = await AdminService.getUsers(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  }),

  // ✅ Update user info
  updateUser: catchAsync(async (req: Request, res: Response) => {
    const user = await AdminService.updateUserById(req.params.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  }),

  // ✅ Block or unblock user
  toggleBlock: catchAsync(async (req: Request, res: Response) => {
    const { block } = req.query;
    const isBlocked = block === 'true';
    const user = await AdminService.toggleUserBlock(req.params.id, isBlocked);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: isBlocked ? 'User blocked successfully' : 'User unblocked successfully',
      data: user,
    });
  }),

  // ✅ Approve or suspend driver
  approveDriver: catchAsync(async (req: Request, res: Response) => {
    const user = await AdminService.updateDriverApproval(req.params.id, req.body.isApproved);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: req.body.isApproved
        ? 'Driver approved successfully'
        : 'Driver suspended successfully',
      data: user,
    });
  }),

  // ✅ Delete user
  deleteUser: catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.deleteUserById(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully',
      data: result,
    });
  }),

  // ✅ Get rides with filters
  getRides: catchAsync(async (req: Request, res: Response) => {
    const rides = await AdminService.getRides(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Rides fetched successfully',
      data: rides,
    });
  }),

  // ✅ Get analytics dashboard
  getDashboard: catchAsync(async (_req: Request, res: Response) => {
    const stats = await AdminService.getDashboardSummary();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Dashboard analytics loaded successfully',
      data: stats,
    });
  }),

  // ✅ Update admin profile
  updateProfile: catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.updateProfile(req.user.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile updated successfully',
      data: result,
    });
  }),

  // ✅ Update admin password
  updatePassword: catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.updatePassword(
      req.user.id,
      req.body.oldPassword,
      req.body.newPassword
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password changed successfully',
      data: result,
    });
  }),
};
