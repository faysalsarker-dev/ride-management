import httpStatus from 'http-status';
import { IUser } from '../auth/auth.interface';
import User from '../auth/User.model';
import { ApiError } from '../../errors/ApiError';
import { Ride } from '../ride/Ride.model';
import bcrypt from 'bcrypt';

// Utility for safe filtering
const buildUserQuery = (query: any) => {
  const filters: any = {};
  if (query.role) filters.role = query.role;
  if (query.isBlocked !== undefined) filters.isBlocked = query.isBlocked === 'true';
  if (query.search) {
    filters.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { email: { $regex: query.search, $options: 'i' } },
    ];
  }
  return filters;
};

export const AdminService = {
  // ✅ Get users with filtering & pagination
  getUsers: async (query: any): Promise<IUser[]> => {
    const filters = buildUserQuery(query);
    const limit = Number(query.limit) || 20;
    const page = Number(query.page) || 1;

    return User.find(filters, { password: 0 })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
  },

  // ✅ Update user details
  updateUserById: async (userId: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    const updated = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
      .select('-password');
    if (!updated) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    return updated;
  },

  // ✅ Block/Unblock user
  toggleUserBlock: async (userId: string, block: boolean) => {
    const user = await User.findByIdAndUpdate(userId, { isBlocked: block }, { new: true });
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    return user;
  },

  // ✅ Approve/Suspend driver
  updateDriverApproval: async (userId: string, isApproved: boolean) => {
    const user = await User.findByIdAndUpdate(
      userId,
      { 'driverProfile.isApproved': isApproved },
      { new: true, runValidators: true }
    );
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Driver not found');
    return user;
  },

  // ✅ Delete user
  deleteUserById: async (userId: string) => {
    return await User.findByIdAndDelete(userId);
  },

  // ✅ Get rides with filters
  getRides: async (filters: any) => {
    const query: any = {};
    if (filters.status) query.status = filters.status;
    if (filters.driverId) query.driver = filters.driverId;
    if (filters.riderId) query.rider = filters.riderId;
    if (filters.startDate && filters.endDate) {
      query.createdAt = { $gte: new Date(filters.startDate), $lte: new Date(filters.endDate) };
    }

    return Ride.find(query)
      .populate('driver', 'name email')
      .populate('rider', 'name email')
      .sort({ createdAt: -1 })
      .lean();
  },

  // ✅ Analytics
  getDashboardSummary: async () => {
    const totalRides = await Ride.countDocuments();
    const totalCompleted = await Ride.countDocuments({ status: 'completed' });
    const totalCancelled = await Ride.countDocuments({
      status: { $in: ['cancelled_by_rider', 'cancelled_by_driver', 'cancelled_by_admin'] },
    });

    const totalRiders = await User.countDocuments({ role: 'rider' });
    const totalDrivers = await User.countDocuments({ role: 'driver' });

    const totalRevenue = await Ride.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$fare' } } },
    ]);

    const revenue = totalRevenue[0]?.total || 0;

    const weeklyStats = await Ride.aggregate([
      {
        $group: {
          _id: { $week: '$createdAt' },
          rides: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
          revenue: { $sum: '$fare' },
        },
      },
      { $sort: { '_id': 1 } },
    ]);

    return {
      totalRides,
      totalCompleted,
      totalCancelled,
      totalRiders,
      totalDrivers,
      totalRevenue: revenue,
      weeklyStats,
    };
  },

  // ✅ Profile Update
  updateProfile: async (userId: string, data: Partial<IUser>) => {
    return User.findByIdAndUpdate(userId, data, { new: true }).select('-password');
  },

  // ✅ Password Update
  updatePassword: async (userId: string, oldPass: string, newPass: string) => {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    const match = await bcrypt.compare(oldPass, user.password);
    if (!match) throw new ApiError(httpStatus.BAD_REQUEST, 'Old password incorrect');
    user.password = await bcrypt.hash(newPass, 10);
    await user.save();
    return { message: 'Password updated successfully' };
  },
};
