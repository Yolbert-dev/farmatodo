import { z } from 'zod/v4';

export const userSchema = z.object({
  id_codigo: z.number(),
  passwordHash: z.string(),
  name: z.string(),
  rol: z.string(),
});
