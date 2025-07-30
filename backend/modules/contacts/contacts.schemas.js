import { z } from 'zod/v4';

const NAME_REGEX = /^[A-Z][a-z]*[ ][A-Z][a-z]{3,}[ ]{0,1}$/;
const PHONE_REGEX = /^[0](412|424|414|426|416|212)[0-9]{7}$/;

export const contactSchema = z.object({
  id: z.number(),
  name: z.string().regex(NAME_REGEX, 'El nombre no es valido.'),
  phone: z.string().regex(PHONE_REGEX, 'Tiene que ser un numero venezolano valido'),
});
