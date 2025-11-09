"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const admin_service_1 = require("./admin.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
exports.AdminController = {
    // ✅ Get all users with filters
    getUsers: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const users = await admin_service_1.AdminService.getUsers(req.query);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Users fetched successfully',
            data: users,
        });
    }),
    // ✅ Update user info
    updateUser: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const user = await admin_service_1.AdminService.updateUserById(req.params.id, req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User updated successfully',
            data: user,
        });
    }),
    // ✅ Block or unblock user
    toggleBlock: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { block } = req.query;
        const isBlocked = block === 'true';
        const user = await admin_service_1.AdminService.toggleUserBlock(req.params.id, isBlocked);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: isBlocked ? 'User blocked successfully' : 'User unblocked successfully',
            data: user,
        });
    }),
    // ✅ Approve or suspend driver
    approveDriver: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const user = await admin_service_1.AdminService.updateDriverApproval(req.params.id, req.body.isApproved);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: req.body.isApproved
                ? 'Driver approved successfully'
                : 'Driver suspended successfully',
            data: user,
        });
    }),
    // ✅ Delete user
    deleteUser: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await admin_service_1.AdminService.deleteUserById(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User deleted successfully',
            data: result,
        });
    }),
    // ✅ Get rides with filters
    getRides: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const rides = await admin_service_1.AdminService.getRides(req.query);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Rides fetched successfully',
            data: rides,
        });
    }),
    // ✅ Get analytics dashboard
    getDashboard: (0, catchAsync_1.catchAsync)(async (_req, res) => {
        const stats = await admin_service_1.AdminService.getDashboardSummary();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Dashboard analytics loaded successfully',
            data: stats,
        });
    }),
    // ✅ Update admin profile
    updateProfile: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await admin_service_1.AdminService.updateProfile(req.user.id, req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Profile updated successfully',
            data: result,
        });
    }),
    // ✅ Update admin password
    updatePassword: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await admin_service_1.AdminService.updatePassword(req.user.id, req.body.oldPassword, req.body.newPassword);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Password changed successfully',
            data: result,
        });
    }),
};
