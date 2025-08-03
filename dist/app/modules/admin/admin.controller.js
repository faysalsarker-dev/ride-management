"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const admin_service_1 = require("./admin.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
exports.AdminUserController = {
    getAllUsers: (0, catchAsync_1.catchAsync)(async (_req, res) => {
        const users = await admin_service_1.AdminUserService.getAllUsers();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'All users fetched successfully',
            data: users,
        });
    }),
    getAllDrivers: (0, catchAsync_1.catchAsync)(async (_req, res) => {
        const drivers = await admin_service_1.AdminUserService.getAllDrivers();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'All drivers fetched successfully',
            data: drivers,
        });
    }),
    updateUserById: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;
        const updatedUser = await admin_service_1.AdminUserService.updateUserById(id, updateData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    }),
    updateApprovalStatus: async (req, res) => {
        const { id } = req.params;
        const { isApproved } = req.body;
        const updatedDriver = await admin_service_1.AdminUserService.updateApprovalStatus(id, isApproved);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `Driver approval status updated to ${isApproved}`,
            data: updatedDriver,
        });
    },
    deleteUserById: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { id } = req.params;
        const deletedUser = await admin_service_1.AdminUserService.deleteUserById(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User deleted successfully',
            data: deletedUser,
        });
    }),
    getSummary: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const summary = await admin_service_1.AdminUserService.getSummary();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'data summary fetched successfully',
            data: summary,
        });
    }),
};
