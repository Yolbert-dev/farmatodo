import jwt from 'jsonwebtoken';
import usersRepository from '../users/users.repository.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies?.access_token;
  console.log(req.cookies);

  if (!token) throw new ErrorWithStatus(401, 'No tienes permitido esta accion');
  const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  const user = await usersRepository.findByEmail({ email: decodedToken.email });
  if (!user) throw new ErrorWithStatus(401, 'No tienes permitido esta accion');
  req.user = user;
  next();
};
