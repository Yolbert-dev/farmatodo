import { z } from 'zod/v4';

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  img: z.string(),
  responsible: z.string(),
  activity_status: z.string(),
  activity_type: z.string(),
  user_id: z.number(),
});
