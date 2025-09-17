import express from 'express';
import taskCompletedRepository from './taskCompleted.repository.js';
import {
  createtaskCompletedRouteSchema,
  deletetaskCompletedRouteSchema,
  updatetaskCompletedRouteSchema,
} from './taskCompleted.routes.schemas.js';
const taskCompletedRouter = express.Router();

taskCompletedRouter.get('/', async (req, res) => {
  const task = await taskCompletedRepository.getAll();
  res.json(task);
});
taskCompletedRouter.get('/count', async (req, res) => {
  try {
    // 1. Llama a la nueva función del repositorio
    const count = await taskCompletedRepository.countAll();

    // 2. Devuelve el conteo en el formato JSON esperado por el frontend
    res.json({ count: count });
  } catch (error) {
    console.error('Error al contar usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
taskCompletedRouter.post('/', async (req, res) => {
  const body = createtaskCompletedRouteSchema.body.parse(req.body);
  const newtask = await taskCompletedRepository.addOne(body);
  res.json(newtask);
});

taskCompletedRouter.delete('/:id', async (req, res) => {
  const params = deletetaskCompletedRouteSchema.params.parse(req.params);
  console.log('PARAMS', params);
  const taskDeleted = await taskCompletedRepository.deleteOneById(params.id);
  console.log('Actividad Eliminada', taskDeleted);

  res.json(taskDeleted);
});

taskCompletedRouter.put('/:id', async (req, res) => {
  const body = updatetaskCompletedRouteSchema.body.parse(req.body);
  const params = updatetaskCompletedRouteSchema.params.parse(req.params);
  const taskUpdated = await taskCompletedRepository.updateOneById(params.id, body);
  res.json(taskUpdated);
});

export default taskCompletedRouter;
