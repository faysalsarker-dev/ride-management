import { z } from 'zod';

export const AuthValidation = {
  register: z.object({
    body: z.object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(6),
      role: z.enum(['rider', 'driver', 'admin']),
      isBlocked: z.boolean().optional(),
      isApproved: z.boolean().optional(),
      isOnline: z.boolean().optional(),
    }),
  }),
  login: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }),
  }),
};
