"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const User_model_1 = __importDefault(require("../auth/User.model"));
const ApiError_1 = require("../../errors/ApiError");
const Ride_model_1 = require("../ride/Ride.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Utility for safe filtering
const buildUserQuery = (query) => {
    const filters = {};
    if (query.role)
        filters.role = query.role;
    if (query.isBlocked !== undefined)
        filters.isBlocked = query.isBlocked === 'true';
    if (query.search) {
        filters.$or = [
            { name: { $regex: query.search, $options: 'i' } },
            { email: { $regex: query.search, $options: 'i' } },
        ];
    }
    return filters;
};
exports.AdminService = {
    // ✅ Get users with filtering & pagination
    getUsers: async (query) => {
        const filters = buildUserQuery(query);
        const limit = Number(query.limit) || 20;
        const page = Number(query.page) || 1;
        return User_model_1.default.find(filters, { password: 0 })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();
    },
    // ✅ Update user details
    updateUserById: async (userId, updateData) => {
        const updated = await User_model_1.default.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
            .select('-password');
        if (!updated)
            throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'User not found');
        return updated;
    },
    // ✅ Block/Unblock user
    toggleUserBlock: async (userId, block) => {
        const user = await User_model_1.default.findByIdAndUpdate(userId, { isBlocked: block }, { new: true });
        if (!user)
            throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'User not found');
        return user;
    },
    // ✅ Approve/Suspend driver
    updateDriverApproval: async (userId, isApproved) => {
        const user = await User_model_1.default.findByIdAndUpdate(userId, { 'driverProfile.isApproved': isApproved }, { new: true, runValidators: true });
        if (!user)
            throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Driver not found');
        return user;
    },
    // ✅ Delete user
    deleteUserById: async (userId) => {
        return await User_model_1.default.findByIdAndDelete(userId);
    },
    // ✅ Get rides with filters
    getRides: async (filters) => {
        const query = {};
        if (filters.status)
            query.status = filters.status;
        if (filters.driverId)
            query.driver = filters.driverId;
        if (filters.riderId)
            query.rider = filters.riderId;
        if (filters.startDate && filters.endDate) {
            query.createdAt = { $gte: new Date(filters.startDate), $lte: new Date(filters.endDate) };
        }
        return Ride_model_1.Ride.find(query)
            .populate('driver', 'name email')
            .populate('rider', 'name email')
            .sort({ createdAt: -1 })
            .lean();
    },
    // ✅ Analytics
    getDashboardSummary: async () => {
        const totalRides = await Ride_model_1.Ride.countDocuments();
        const totalCompleted = await Ride_model_1.Ride.countDocuments({ status: 'completed' });
        const totalCancelled = await Ride_model_1.Ride.countDocuments({
            status: { $in: ['cancelled_by_rider', 'cancelled_by_driver', 'cancelled_by_admin'] },
        });
        const totalRiders = await User_model_1.default.countDocuments({ role: 'rider' });
        const totalDrivers = await User_model_1.default.countDocuments({ role: 'driver' });
        const totalRevenue = await Ride_model_1.Ride.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$fare' } } },
        ]);
        const revenue = totalRevenue[0]?.total || 0;
        const weeklyStats = await Ride_model_1.Ride.aggregate([
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
    updateProfile: async (userId, data) => {
        return User_model_1.default.findByIdAndUpdate(userId, data, { new: true }).select('-password');
    },
    // ✅ Password Update
    updatePassword: async (userId, oldPass, newPass) => {
        const user = await User_model_1.default.findById(userId);
        if (!user)
            throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'User not found');
        const match = await bcrypt_1.default.compare(oldPass, user.password);
        if (!match)
            throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Old password incorrect');
        user.password = await bcrypt_1.default.hash(newPass, 10);
        await user.save();
        return { message: 'Password updated successfully' };
    },
};
