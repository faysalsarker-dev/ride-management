"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
const mongoose_1 = require("mongoose");
const HistorySchema = new mongoose_1.Schema({
    rideId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Ride', required: true },
    riderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    driverId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    riderRating: { type: Number, min: 1, max: 5, default: null },
    riderFeedback: { type: String, default: '' },
    driverRating: { type: Number, min: 1, max: 5, default: null },
    driverFeedback: { type: String, default: '' },
    status: {
        type: String,
        enum: ['COMPLETED', 'CANCELLED', 'REJECTED'],
        default: 'COMPLETED',
    },
    completedAt: Date,
}, { timestamps: true });
exports.History = (0, mongoose_1.model)('History', HistorySchema);
