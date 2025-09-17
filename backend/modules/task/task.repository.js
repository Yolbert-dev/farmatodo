import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query('SELECT * FROM activity');
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO activity (title,description,img,responsible,activity_status,activity_type,user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `,
    [
      payload.title,
      payload.description,
      payload.img,
      payload.responsible,
      payload.activity_status,
      payload.activity_type,
      payload.user_id,
    ],
  );
  return response.rows[0];
};

const deleteOneById = async (id) => {
  const response = await db.query(
    `
    DELETE FROM contacts
    WHERE id = $1 RETURNING *
  `,
    [id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El contacto fue no encontrado');
  }
  return response.rows[0];
};

const updateOneById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE activity
    SET 
    activity_status = $1
    WHERE id = $2
    RETURNING *
  `,
    [payload.activity_status, id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La actividad no fue encontrado');
  }
  return response.rows[0];
};
const countAll = async () => {
  try {
    const response = await db.query(
      `SELECT COUNT(*) AS total
         FROM activity
        WHERE activity_status = $1`,
      ['En proceso'],
    );

    const count = parseInt(response.rows[0].total, 10);
    return count;
  } catch (error) {
    console.error('Error en el repositorio al contar actividades en proceso:', error);
    throw new Error(
      'No se pudo obtener el conteo de actividades en proceso desde la base de datos.',
    );
  }
};
const taskRepository = { getAll, addOne, deleteOneById, updateOneById, countAll };

export default taskRepository;
