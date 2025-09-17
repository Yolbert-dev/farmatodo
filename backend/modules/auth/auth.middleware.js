import jwt from 'jsonwebtoken';
import usersRepository from '../users/users.repository.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

export const authenticateUser = async (req, res, next) => {
  // Imprimimos las cookies para depurar. Si esto muestra {}, el problema es CORS o la creación de la cookie.

  const token = req.cookies?.access_token;

  // CAMBIO 1: Mensaje específico para cuando no llega la cookie.
  // Esto es exactamente como detectas el "Caso 1".
  if (!token) {
    // Usamos next(error) para pasar el control al manejador de errores de Express.
    return next(
      new ErrorWithStatus(
        401,
        'No se encontró el token de autenticación. Asegúrate de haber iniciado sesión.',
      ),
    );
  }

  try {
    // CAMBIO 2: Usar el secreto correcto para el ACCESS token.
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await usersRepository.findByCodigo({ id_codigo: decodedToken.id_codigo });

    // CAMBIO 3: Mensaje específico si el usuario del token ya no existe.
    if (!user) {
      return next(new ErrorWithStatus(401, 'El usuario asociado a este token ya no existe.'));
    }

    req.user = user;
    next();
  } catch (error) {
    // CAMBIO 4: Manejar errores específicos de JWT (token inválido, expirado, etc.)
    if (error instanceof jwt.JsonWebTokenError) {
      // Esto ocurre si el token fue manipulado o la firma no coincide.
      return next(new ErrorWithStatus(401, 'El token proporcionado no es válido.'));
    }
    // Si es otro tipo de error (como TokenExpiredError), lo pasamos al manejador general.
    // Tu manejador en app.js ya gestiona TokenExpiredError perfectamente.
    next(error);
  }
};
