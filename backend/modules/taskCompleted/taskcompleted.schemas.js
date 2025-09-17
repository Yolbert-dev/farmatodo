import { z } from 'zod/v4';

export const taskCompletedSchema = z.object({
  id: z.number(),
  description: z.string(),
  img: z.string(),
  user_id: z.number(),
  activity_id: z.number(),
});
