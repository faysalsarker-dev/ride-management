import { z } from 'zod';

export const createRideSchema = z.object({
  rider: z.string(),
  pickupLocation: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
    address: z.string().optional(),
  }),
  destinationLocation: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
    address: z.string().optional(),
  }),
});

export const updateRideStatusSchema = z.object({
  status: z.enum([
    'accepted',
    'picked_up',
    'in_transit',
    'completed',
    'cancelled_by_rider',
    'cancelled_by_driver',
  ]),
});
