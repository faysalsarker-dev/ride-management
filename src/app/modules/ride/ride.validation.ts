import { string, z } from 'zod';
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectId = z.string().regex(objectIdRegex, 'Invalid ObjectId format');

export const createRideSchema = z.object({
  body: z.object({
    pickupLocation: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
      address: z.string().optional(),
    }),
    destinationLocation: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
      address: z.string().optional(),
    }),
   
  }),
});

export const updateRideSchema = z.object({
  body: z.object({
    status: z.enum([
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

export const updateRideStatusSchema = z.object({
  body: z.object({
    status: z.enum([
      'accepted',
      'picked_up',
      'in_transit',
      'completed',
      'cancelled_by_rider',
      'cancelled_by_driver',
    ]),
  }),
});
