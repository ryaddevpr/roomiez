import { z } from 'zod';

export const createMaisonZodSchema = z.object({
  address: z.string().min(1),
  city: z.string().min(1),
  image: z.string().min(1).optional(),
  price: z.number().min(1),
  size: z.number().min(1),
  proprietaire: z.number().optional(),
});

export type CreateMaisonZodDto = z.infer<typeof createMaisonZodSchema>;
