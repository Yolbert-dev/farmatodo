/* eslint-disable prettier/prettier */
import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query('SELECT * FROM incidence');
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO incidence (description,type,till,monto,transsacion,user_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
  `,
    [
      payload.description,
      payload.type,
      payload.till,
      payload.monto,
      payload.transsacion,
      payload.user_id,
    ],
  );
  return response.rows[0];
};

const deleteOneById = async (id) => {
  const response = await db.query(
    `
    DELETE FROM incidence
    WHERE id = $1 RETURNING *
  `,
    [id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El contacto fue no encontrado');
  }
  return response.rows[0];
};



const incidenceRepository = { getAll, addOne, deleteOneById };

export default incidenceRepository;
