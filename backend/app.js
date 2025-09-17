import express from 'express';
import taskRouter from './modules/task/task.routes.js';
import taskCompletedRouter from './modules/taskCompleted/taskCompleted.routes.js';
import { ZodError } from 'zod/v4';
import { ErrorWithStatus } from './utils/errorTypes.js';
import { DatabaseError } from 'pg';
import cors from 'cors';
import usersRouter from './modules/users/users.routes.js';
import jwt from 'jsonwebtoken';
import authRouter from './modules/auth/login.routes.js';
import incidenceRouter from './modules/incidence/incidence.routes.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({ credentials: true, origin: ['http://localhost:4321'] }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ hola: 'mundo' });
});

app.use('/api/task', taskRouter);
app.use('/api/taskCompleted', taskCompletedRouter);
app.use('/api/incidence', incidenceRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, _next) => {
  console.log(err);

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(403).json({ error: 'El tiempo para validar su usuario ha expirado' });
  }

  if (err instanceof ZodError) {
    const messages = err.issues.map((zodError) => zodError.message);
    const message = messages.join(',\n');
    return res.status(400).json({ error: message });
  }

  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err instanceof DatabaseError) {
    if (err.code === '22P02') {
      return res.status(400).json({ error: 'Hubo un error. Contacte al administrador' });
    }
    if (err.code === '23505') {
      return res.status(400).json({ error: 'El correo ya existe.' });
    }
  }

  res.json({ erorr: 'HUBO UN ERROR' });
});

export default app;
