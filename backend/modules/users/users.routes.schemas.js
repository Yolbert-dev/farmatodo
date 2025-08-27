import { z } from 'zod/v4';

const userIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const createUserRouteSchema = {
  params: z.object({}),
  body: z.object({
    id_codigo: z.number('tiene que ser un numero'),
    password: z.string(
      'Debe tener al menos 6 caracteres e incluir una letra, un número y un carácter especial (!@#$%^&*).',
    ),
    name: z.string('Debe ser un nombre valido'),
    rol: z.string('Debe ser un rol valido'),
  }),
  queries: z.object({}),
};

export const deleteuserRouteSchema = {
  params: z.object({ id: userIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};
