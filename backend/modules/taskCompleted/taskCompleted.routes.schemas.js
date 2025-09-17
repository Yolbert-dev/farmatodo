import { z } from 'zod/v4';
import { taskCompletedSchema } from './taskcompleted.schemas.js';

const taskCompletedIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const createtaskCompletedRouteSchema = {
  params: z.object({}),
  body: taskCompletedSchema.omit({ id: true }),
  queries: z.object({}),
};

export const deletetaskCompletedRouteSchema = {
  params: z.object({ id: taskCompletedIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};

export const updatetaskCompletedRouteSchema = {
  params: z.object({ id: taskCompletedIdSchema }),
  body: taskCompletedSchema.omit({ id: true }),
  queries: z.object({}),
};
