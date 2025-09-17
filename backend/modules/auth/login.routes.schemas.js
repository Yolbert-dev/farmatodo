import { z } from 'zod/v4';

export const logInRouteSchema = {
  params: z.object({}),
  body: z.object({
    id_codigo: z.number(),
    passwordhash: z.string(),
  }),
  queries: z.object({}),
};
export const getLoggedUserRouteSchema = {
  params: z.object({}),
  body: z.object({}),
  queries: z.object({}),
};

export const logOutUserRouteSchema = {
  params: z.object({}),
  body: z.object({}),
  queries: z.object({}),
};
