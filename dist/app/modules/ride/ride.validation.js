"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRideStatusSchema = exports.updateRideSchema = exports.createRideSchema = void 0;
const zod_1 = require("zod");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectId = zod_1.z.string().regex(objectIdRegex, 'Invalid ObjectId format');
exports.createRideSchema = zod_1.z.object({
    body: zod_1.z.object({
        pickupLocation: zod_1.z.object({
            lat: zod_1.z.number().min(-90).max(90),
            lng: zod_1.z.number().min(-180).max(180),
            address: zod_1.z.string().optional(),
        }),
        destinationLocation: zod_1.z.object({
            lat: zod_1.z.number().min(-90).max(90),
            lng: zod_1.z.number().min(-180).max(180),
            address: zod_1.z.string().optional(),
        }),
    }),
});
exports.updateRideSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([
            'requested',
            'accepted',
            'picked_up',
            'in_transit',
            'completed',
            'cancelled_by_rider',
            'cancelled_by_driver',
        ]).optional(),
        driver: objectId.optional(),
    }),
});
exports.updateRideStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([
            'accepted',
            'picked_up',
            'in_transit',
            'completed',
            'cancelled_by_rider',
            'cancelled_by_driver',
        ]),
    }),
});
