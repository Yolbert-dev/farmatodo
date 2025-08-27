import express from 'express';
import taskRepository from './task.repository.js';
import {
  createtaskRouteSchema,
  deletetaskRouteSchema,
  updatetaskRouteSchema,
} from './task.routes.schemas.js';
const taskRouter = express.Router();

taskRouter.get('/', async (req, res) => {
  const task = await taskRepository.getAll();
  res.json(task);
});

taskRouter.post('/', async (req, res) => {
  const body = createtaskRouteSchema.body.parse(req.body);
  const newtask = await taskRepository.addOne(body);
  res.json(newtask);
});

taskRouter.delete('/:id', async (req, res) => {
  const params = deletetaskRouteSchema.params.parse(req.params);
  console.log('PARAMS', params);
  const taskDeleted = await taskRepository.deleteOneById(params.id);
  console.log('Actividad Eliminada', taskDeleted);

  res.json(taskDeleted);
});

taskRouter.put('/:id', async (req, res) => {
  const body = updatetaskRouteSchema.body.parse(req.body);
  const params = updatetaskRouteSchema.params.parse(req.params);
  const taskUpdated = await taskRepository.updateOneById(params.id, body);
  res.json(taskUpdated);
});

export default taskRouter;
