import { z } from 'zod';
import { UtilisateurRole } from '../../types/utilisateur';

export const createUtilisateurZodSchema = z.object({
  name: z.string().min(1),

  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(UtilisateurRole).optional(),
});

export type CreateUtilisateurZodDto = z.infer<
  typeof createUtilisateurZodSchema
>;
