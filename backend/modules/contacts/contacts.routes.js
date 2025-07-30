import express from 'express';
import contactsRepository from './contacts.repository.js';
import {
  createContactRouteSchema,
  deleteContactRouteSchema,
  updateContactRouteSchema,
} from './contacts.routes.schemas.js';
const contactsRouter = express.Router();

contactsRouter.get('/', async (req, res) => {
  const contacts = await contactsRepository.getAll();
  res.json(contacts);
});

contactsRouter.post('/', async (req, res) => {
  const body = createContactRouteSchema.body.parse(req.body);
  const newContact = await contactsRepository.addOne(body);
  res.json(newContact);
});

contactsRouter.delete('/:id', async (req, res) => {
  const params = deleteContactRouteSchema.params.parse(req.params);
  console.log('PARAMS', params);
  const contactDeleted = await contactsRepository.deleteOneById(params.id);
  console.log('CONTACTO ELIMINADO', contactDeleted);

  res.json(contactDeleted);
});

contactsRouter.put('/:id', async (req, res) => {
  const body = updateContactRouteSchema.body.parse(req.body);
  const params = updateContactRouteSchema.params.parse(req.params);
  const contactUpdated = await contactsRepository.updateOneById(params.id, body);
  res.json(contactUpdated);
});

export default contactsRouter;
