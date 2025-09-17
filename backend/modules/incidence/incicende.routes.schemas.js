import { z } from 'zod/v4';
import { incidenceSchema } from './incidence.schemas.js';

const incidenceIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const createIncidenceRouteSchema = {
  params: z.object({}),
  body: incidenceSchema.omit({ id: true }),
  queries: z.object({}),
};

export const deleteIncidenceRouteSchema = {
  params: z.object({ id: incidenceIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};
