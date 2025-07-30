import { z } from 'zod/v4';
import { contactSchema } from './contacts.schemas.js';

const contactIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const createContactRouteSchema = {
  params: z.object({}),
  body: contactSchema.omit({ id: true }),
  queries: z.object({}),
};

export const deleteContactRouteSchema = {
  params: z.object({ id: contactIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};

export const updateContactRouteSchema = {
  params: z.object({ id: contactIdSchema }),
  body: contactSchema.omit({ id: true }),
  queries: z.object({}),
};
