import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { logInRouteSchema } from './login.routes.schemas.js';
import usersRepository from '../users/users.repository.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';
import { authenticateUser } from './auth.middleware.js';
const loginRoutes = express.Router();

loginRoutes.post('/login', async (req, res) => {
  const body = logInRouteSchema.body.parse(req.body);
  const user = await usersRepository.findByCodigo({ id_codigo: body.id_codigo });
  if (!user) throw new ErrorWithStatus(400, 'Usuario o contraseña invalida');
  const isPasswordValid = await bcrypt.compare(body.passwordhash, user.passwordhash);
  if (!isPasswordValid) throw new ErrorWithStatus(400, 'Usuario o contraseña invalida');
  const token = jwt.sign({ id_codigo: user.id_codigo }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('access_token', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'Lax', // o 'Strict' si no necesitas cross-site
    secure: false, // ← esto permite que se envíe por HTTP
  });

  res.status(200).json({ id_codigo: user.id_codigo, name: user.name, accessToken: token });
});

loginRoutes.get('/user', authenticateUser, async (req, res) => {
  const { user } = req;

  const loggedUser = {
    id: user.id_codigo,
    name: user.name,
  };

  return res.status(200).json(loggedUser);
});

loginRoutes.get('/logout', async (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) return res.sendStatus(200);
  res.clearCookie('access_token', { path: '/' });
  return res.sendStatus(200);
});

export default loginRoutes;
