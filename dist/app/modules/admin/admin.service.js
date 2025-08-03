"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const User_model_1 = __importDefault(require("../auth/User.model"));
const ApiError_1 = require("../../errors/ApiError");
const Ride_model_1 = require("../ride/Ride.model");
exports.AdminUserService = {
    getAllUsers: async () => {
        return User_model_1.default.find({ role: 'rider' }, { password: 0, driverProfile: 0 }).lean();
    },
    getAllDrivers: async () => {
        return User_model_1.default.find({ role: 'driver' }, { password: 0 }).lean();
    },
    updateUserById: async (userId, updateData) => {
        const updatedUser = await User_model_1.default.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select('-password');
        if (!updatedUser) {
            throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'User not found');
        }
        return updatedUser;
    },
    updateApprovalStatus: async (userId, isApproved) => {
        return await User_model_1.default.findByIdAndUpdate(userId, { 'driverProfile.isApproved': isApproved }, { new: true, runValidators: true });
    },
    deleteUserById: async (userId) => {
        const deletedUser = await User_model_1.default.findByIdAndDelete(userId);
        return deletedUser;
    },
    getSummary: async () => {
        const totalRides = await Ride_model_1.Ride.countDocuments();
        const totalCompletedRides = await Ride_model_1.Ride.countDocuments({ status: 'completed' });
        const totalCancelledRides = await Ride_model_1.Ride.countDocuments({
            status: { $in: ['cancelled_by_rider', 'cancelled_by_driver'] },
        });
        const riderCancelledCount = await Ride_model_1.Ride.countDocuments({ status: 'cancelled_by_rider' });
        const driverCancelledCount = await Ride_model_1.Ride.countDocuments({ status: 'cancelled_by_driver' });
        const adminCancelledCount = await Ride_model_1.Ride.countDocuments({ cancelledBy: 'admin' });
        const cancellationTotal = riderCancelledCount + driverCancelledCount + adminCancelledCount;
        const getPercentage = (count) => cancellationTotal > 0 ? ((count / cancellationTotal) * 100).toFixed(2) + '%' : '0%';
        // ✅ Get users by role
        const totalRiders = await User_model_1.default.countDocuments({ role: 'rider' });
        const totalDrivers = await User_model_1.default.countDocuments({ role: 'driver' });
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
