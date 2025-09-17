import { z } from 'zod/v4';

export const incidenceSchema = z.object({
  id: z.number(),
  description: z.string(),
  type: z.string(),
  till: z.string(),
  monto: z.string(),
  transsacion: z.string(),
  user_id: z.number(),
});
