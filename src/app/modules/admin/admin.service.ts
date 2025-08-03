
import httpStatus from 'http-status';
import { IUser } from '../auth/auth.interface';
import User from '../auth/User.model';
import { ApiError } from '../../errors/ApiError';
import { Ride } from '../ride/Ride.model';

export const AdminUserService = {
  getAllUsers: async (): Promise<IUser[]> => {
    return User.find({role:'rider'}, { password: 0, driverProfile:0 }).lean();
  },

  getAllDrivers: async (): Promise<IUser[]> => {
    return User.find({ role: 'driver' }, { password: 0 }).lean();
  },

  updateUserById: async (
    userId: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> => {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    return updatedUser;
  },

  updateApprovalStatus: async (userId: string, isApproved: boolean) => {
    return await User.findByIdAndUpdate(
      userId,
      { 'driverProfile.isApproved': isApproved },
      { new: true, runValidators: true }
    );
  },
deleteUserById: async (userId: string): Promise<IUser | null> => {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  },

  getSummary: async () => {
    const totalRides = await Ride.countDocuments();

    const totalCompletedRides = await Ride.countDocuments({ status: 'completed' });

    const totalCancelledRides = await Ride.countDocuments({
      status: { $in: ['cancelled_by_rider', 'cancelled_by_driver'] },
    });

    const riderCancelledCount = await Ride.countDocuments({ status: 'cancelled_by_rider' });
    const driverCancelledCount = await Ride.countDocuments({ status: 'cancelled_by_driver' });
    const adminCancelledCount = await Ride.countDocuments({ cancelledBy: 'admin' });

    const cancellationTotal = riderCancelledCount + driverCancelledCount + adminCancelledCount;

    const getPercentage = (count: number) =>
      cancellationTotal > 0 ? ((count / cancellationTotal) * 100).toFixed(2) + '%' : '0%';

    // ✅ Get users by role
    const totalRiders = await User.countDocuments({ role: 'rider' });
    const totalDrivers = await User.countDocuments({ role: 'driver' });

    return {
      totalRides,
      totalCompletedRides,
      totalCancelledRides,
      totalRiders,
      totalDrivers,
      cancellations: {
        rider: {
          count: riderCancelledCount,
          percentage: getPercentage(riderCancelledCount),
        },
        driver: {
          count: driverCancelledCount,
          percentage: getPercentage(driverCancelledCount),
        },
        admin: {
          count: adminCancelledCount,
          percentage: getPercentage(adminCancelledCount),
        },
      },
    };
  },
};
