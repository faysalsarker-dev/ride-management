"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const calculateFare_1 = require("../../utils/calculateFare");
const rideSchema = new mongoose_1.Schema({
    rider: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    driver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    status: {
        type: String,
        enum: [
            'requested',
            'accepted',
            'picked_up',
            'in_transit',
            'completed',
            'cancelled_by_rider',
            'cancelled_by_driver',
        ],
        default: 'requested',
    },
    pickupLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String },
    },
    destinationLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String },
    },
    fare: {
        type: Number,
        default: 0,
    },
    cancelledBy: {
        type: String,
        enum: ['rider', 'driver', 'admin'],
    },
    rideTimeline: {
        requestedAt: { type: Date, default: Date.now },
        acceptedAt: Date,
        pickedUpAt: Date,
        completedAt: Date,
        cancelledAt: Date,
    },
}, {
    timestamps: true,
});
exports.Ride = (0, mongoose_1.model)('Ride', rideSchema);
rideSchema.pre('save', function (next) {
    if (!this.isModified('pickupLocation') || !this.isModified('destinationLocation')) {
        return next();
    }
    const pickup = this.pickupLocation;
    const destination = this.destinationLocation;
    const distance = (0, calculateFare_1.calculateFare)(pickup.lat, pickup.lng, destination.lat, destination.lng);
    console.log(`Calculated distance: ${distance} km`);
    this.fare = Math.ceil(distance * 20);
    next();
});
