import { z } from 'zod/v4';
import { taskSchema } from './task.schemas.js';

const taskIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const createtaskRouteSchema = {
  params: z.object({}),
  body: taskSchema.omit({ id: true }),
  queries: z.object({}),
};

export const deletetaskRouteSchema = {
  params: z.object({ id: taskIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};

export const updatetaskRouteSchema = {
  params: z.object({ id: taskIdSchema }),
  body: taskSchema.omit({ id: true }),
  queries: z.object({}),
};
