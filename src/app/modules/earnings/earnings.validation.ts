import { z } from 'zod';

export const EarningsValidation = {
  create: z.object({
    body: z.object({
      driver: z.string().min(1, 'Driver ID is required'),
      ride: z.string().min(1, 'Ride ID is required'),
      amount: z.number().min(0, 'Amount must be a positive number'),
      earnedAt: z.date().optional(),
    }),
  }),
};
