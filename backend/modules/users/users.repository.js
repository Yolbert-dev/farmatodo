import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query('SELECT * FROM users');
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO users (id_codigo, passwordHash, name, rol)
    VALUES ($1, $2, $3, $4) RETURNING *
  `,
    [payload.id_codigo, payload.passwordHash, payload.name, payload.rol],
  );
  return response.rows[0];
};

const deleteOneById = async (id) => {
  const response = await db.query(
    `
    DELETE FROM users
    WHERE id_codigo = $1 RETURNING *
  `,
    [id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El contacto fue no encontrado');
  }
  return response.rows[0];
};

const usersRepository = { addOne, getAll, deleteOneById };

export default usersRepository;
