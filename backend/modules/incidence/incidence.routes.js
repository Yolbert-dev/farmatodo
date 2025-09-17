/* eslint-disable prettier/prettier */
import express from 'express';
import incidenceRepository from './incidence.repository.js';
import {
  createIncidenceRouteSchema,
  deleteIncidenceRouteSchema,
} from './incicende.routes.schemas.js';
const incidenceRouter = express.Router();

incidenceRouter.get('/', async (req, res) => {
  const incidence = await incidenceRepository.getAll();
  res.json(incidence);
});

incidenceRouter.get('/count', async (req, res) => {
  try {
    // 1. Llama a la nueva función del repositorio
    const count = await incidenceRepository.countAll();

    // 2. Devuelve el conteo en el formato JSON esperado por el frontend
    res.json({ count: count });
  } catch (error) {
    console.error('Error al contar incidencia:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

incidenceRouter.post('/', async (req, res) => {
  const body = createIncidenceRouteSchema.body.parse(req.body);
  const newincidence = await incidenceRepository.addOne(body);
  res.json(newincidence);
});

incidenceRouter.delete('/:id', async (req, res) => {
  const params = deleteIncidenceRouteSchema.params.parse(req.params);
  console.log('PARAMS', params);
  const incidenceDeleted = await incidenceRepository.deleteOneById(params.id);
  console.log('Incidencia Eliminada', incidenceDeleted);

  res.json(incidenceDeleted);
});

export default incidenceRouter;
