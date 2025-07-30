import express from 'express';
import { createUserRouteSchema } from './users.routes.schemas.js';
import bcrypt from 'bcrypt';
import usersRepository from './users.repository.js';
const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
  try {
    // 1. Validar los datos de entrada
    const body = createUserRouteSchema.body.parse(req.body);
    // 2. Hashear la contraseña
    const passwordHash = await bcrypt.hash(body.password, 10);
    // 3. Crear el usuario directamente en la base de datos
    const newUser = await usersRepository.addOne({
      id_codigo: body.id_codigo,
      passwordHash,
      name: body.name,
      rol: body.rol,
    });
    // Devolvemos el usuario creado sin el passwordHash por seguridad.
    res.status(201).json({
      id: newUser.id_codigo,
      name: newUser.name,
      rol: newUser.rol,
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'El usuario ya existe.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
  }
});

export default usersRouter;
