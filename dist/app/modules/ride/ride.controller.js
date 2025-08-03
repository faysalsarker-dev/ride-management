"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ride_service_1 = require("./ride.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = require("../../utils/catchAsync");
exports.RideController = {
    createRide: (0, catchAsync_1.catchAsync)(async (req, res) => {
        if (req.user.role !== 'rider') {
            return (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.FORBIDDEN,
                success: false,
                message: 'Only riders can create rides',
            });
        }
        if (req.user.isBlocked) {
            return (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.FORBIDDEN,
                success: false,
                message: 'Your account is blocked',
            });
        }
        const result = await ride_service_1.RiderService.createRide({ ...req.body, rider: req.user._id });
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Ride created successfully!',
            data: result,
        });
    }),
    getAllRides: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await ride_service_1.RiderService.getAllRides(req.user._id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'All rides fetched successfully!',
            data: result,
        });
    }),
    getSingleRide: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { rideId } = req.params;
        const result = await ride_service_1.RiderService.getSingleRide(rideId);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Ride details retrieved successfully!',
            data: result,
        });
    }),
    updateRide: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { rideId } = req.params;
        const result = await ride_service_1.RiderService.updateRide(req.user._id, rideId, req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Ride updated successfully!',
            data: result,
        });
    }),
    deleteRide: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { rideId } = req.params;
        const result = await ride_service_1.RiderService.deleteRide(req.user._id, rideId);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Ride deleted successfully!',
            data: result,
        });
    }),
    cancelRide: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { rideId } = req.params;
        const result = await ride_service_1.RiderService.cancelRide(rideId, req.user.role, req.user._id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Ride cancelled successfully!',
            data: result,
        });
    }),
    acceptRide: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { rideId } = req.params;
        const result = await ride_service_1.RiderService.driverAcceptRide(rideId, req.user._id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Ride accepted successfully!',
            data: result,
        });
    }),
    updateRideStatus: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { id } = req.params;
        const status = req.body.status;
        const result = await ride_service_1.RiderService.updateRideStatus(id, status);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `Ride status updated to ${status}`,
            data: result,
        });
    }),
    getAvailableRides: (0, catchAsync_1.catchAsync)(async (_req, res) => {
        console.log('Fetching available rides...');
        const result = await ride_service_1.RiderService.getAvailableRides();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Available rides fetched successfully!',
            data: result,
        });
    }),
};
