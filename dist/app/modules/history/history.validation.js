"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHistorySchema = exports.driverFeedbackSchema = exports.riderFeedbackSchema = exports.createHistorySchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const objectIdZod = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
});
exports.createHistorySchema = zod_1.z.object({
    body: zod_1.z.object({
        rideId: objectIdZod,
        riderId: objectIdZod,
        driverId: objectIdZod,
        riderRating: zod_1.z.number().min(1).max(5).optional(),
        riderFeedback: zod_1.z.string().optional(),
        driverRating: zod_1.z.number().min(1).max(5).optional(),
        driverFeedback: zod_1.z.string().optional(),
        status: zod_1.z.enum(['COMPLETED', 'CANCELLED', 'REJECTED']).optional(),
        completedAt: zod_1.z.coerce.date().optional(),
    }),
});
exports.riderFeedbackSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
        feedback: zod_1.z.string().optional(),
    }),
});
exports.driverFeedbackSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
        feedback: zod_1.z.string().optional(),
    }),
});
exports.updateHistorySchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number().min(1).max(5).optional(),
        riderRating: zod_1.z.number().min(1).max(5).optional(),
        driverRating: zod_1.z.number().min(1).max(5).optional(),
        riderFeedback: zod_1.z.string().optional(),
        driverFeedback: zod_1.z.string().optional(),
    }),
});
