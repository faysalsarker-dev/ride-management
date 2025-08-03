"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiderService = void 0;
const mongoose_1 = require("mongoose");
const Ride_model_1 = require("./Ride.model");
const ride_interface_1 = require("./ride.interface");
const calculateFare_1 = require("../../utils/calculateFare");
const ApiError_1 = require("../../errors/ApiError");
const history_service_1 = require("../history/history.service");
const User_model_1 = __importDefault(require("../auth/User.model"));
exports.RiderService = {
    createRide: async (payload) => {
        if (!payload.rider) {
            throw new ApiError_1.ApiError(400, 'Rider information is required.');
        }
        const isRiderInRide = await Ride_model_1.Ride.findOne({
            rider: payload.rider,
            status: { $in: [ride_interface_1.RideStatus.Requested, ride_interface_1.RideStatus.Accepted] },
        });
        if (isRiderInRide?.status === ride_interface_1.RideStatus.Requested) {
            throw new ApiError_1.ApiError(400, 'You already requested for a ride and it is still pending.');
        }
        else if (isRiderInRide?.status === ride_interface_1.RideStatus.Accepted) {
            throw new ApiError_1.ApiError(400, 'You already accepted a ride and it is still pending.');
        }
        const { pickupLocation, destinationLocation } = payload;
        if (!pickupLocation || !destinationLocation) {
            throw new ApiError_1.ApiError(400, 'Pickup and destination locations are required.');
        }
        const distance = (0, calculateFare_1.calculateFare)(pickupLocation.lat, pickupLocation.lng, destinationLocation.lat, destinationLocation.lng);
        const fare = Math.ceil(distance * 20);
        const newRide = await Ride_model_1.Ride.create({
            ...payload,
            fare,
        });
        return newRide;
    },
    getAllRides: async (riderId) => {
        return Ride_model_1.Ride.find({ rider: new mongoose_1.Types.ObjectId(riderId) })
            .populate('driver', 'name email')
            .sort({ createdAt: -1 });
    },
    getSingleRide: async (rideId) => {
        return Ride_model_1.Ride.findOne({
            _id: rideId,
        }).populate('driver', 'name email');
    },
    updateRide: async (riderId, rideId, updateData) => {
        const ride = await Ride_model_1.Ride.findOneAndUpdate({ _id: rideId, rider: new mongoose_1.Types.ObjectId(riderId) }, updateData, { new: true });
        return ride;
    },
    deleteRide: async (riderId, rideId) => {
        const ride = await Ride_model_1.Ride.findOneAndDelete({
            _id: rideId,
            rider: new mongoose_1.Types.ObjectId(riderId),
        });
        return ride;
    },
    updateRideStatus: async (rideId, status) => {
        const update = { status };
        const statusTimeMap = {
            [ride_interface_1.RideStatus.Accepted]: 'acceptedAt',
            [ride_interface_1.RideStatus.PickedUp]: 'pickedUpAt',
            [ride_interface_1.RideStatus.Completed]: 'completedAt',
            [ride_interface_1.RideStatus.CancelledByDriver]: 'cancelledAt',
            [ride_interface_1.RideStatus.CancelledByRider]: 'cancelledAt',
        };
        const timelineKey = statusTimeMap[status];
        if (timelineKey) {
            update[`rideTimeline.${timelineKey}`] = new Date();
        }
        const updatedRide = await Ride_model_1.Ride.findByIdAndUpdate(rideId, update, {
            new: true,
        });
        if (status === ride_interface_1.RideStatus.Completed && updatedRide) {
            await history_service_1.HistoryService.createHistory({
                rideId: new mongoose_1.Types.ObjectId(updatedRide._id),
                riderId: updatedRide.rider,
                driverId: updatedRide.driver,
                status: 'COMPLETED',
                completedAt: new Date(),
            });
        }
        return updatedRide;
    },
    cancelRide: async (rideId, cancelledBy, userId) => {
        const ride = await Ride_model_1.Ride.findById(rideId);
        if (!ride)
            throw new Error('Ride not found');
        if ((cancelledBy === 'rider' && ride.rider.toString() !== userId) ||
            (cancelledBy === 'driver' && ride.driver?.toString() !== userId)) {
            throw new Error('Unauthorized cancellation');
        }
        const status = cancelledBy === 'rider'
            ? ride_interface_1.RideStatus.CancelledByRider
            : ride_interface_1.RideStatus.CancelledByDriver;
        ride.status = status;
        ride.cancelledBy = cancelledBy;
        if (!ride.rideTimeline) {
            ride.rideTimeline = {};
        }
        ride.rideTimeline.cancelledAt = new Date();
        await ride.save();
        return ride;
    },
    driverAcceptRide: async (rideId, driverId) => {
        const isDriverAprooved = await User_model_1.default.findById(driverId);
        if (!isDriverAprooved ||
            isDriverAprooved.role !== 'driver' ||
            isDriverAprooved.isBlocked ||
            !isDriverAprooved.driverProfile?.isApproved) {
            throw new ApiError_1.ApiError(403, 'Driver is not approved');
        }
        const isDriving = await Ride_model_1.Ride.findOne({
            driver: new mongoose_1.Types.ObjectId(driverId),
            status: { $in: [ride_interface_1.RideStatus.Accepted, ride_interface_1.RideStatus.PickedUp, ride_interface_1.RideStatus.InTransit] },
        });
        if (isDriving) {
            throw new ApiError_1.ApiError(400, 'You are already driving another ride.');
        }
        return Ride_model_1.Ride.findOneAndUpdate({ _id: rideId, status: ride_interface_1.RideStatus.Requested }, {
            driver: driverId,
            status: ride_interface_1.RideStatus.Accepted,
            'rideTimeline.acceptedAt': new Date(),
        }, { new: true });
    },
    getAvailableRides: async () => {
        return Ride_model_1.Ride.find({ status: ride_interface_1.RideStatus.Requested })
            .populate('rider', 'name email')
            .sort({ createdAt: -1 });
    }
};
