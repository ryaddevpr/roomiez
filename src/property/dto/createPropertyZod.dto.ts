import { z } from 'zod';

export const createPropertyZodSchema = z
  .object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
}).required()

export type CreatePropertyZodDto = z.infer<typeof createPropertyZodSchema>;


