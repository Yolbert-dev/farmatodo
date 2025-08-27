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
    UPDATE contacts
    SET name = $1, phone = $2
    WHERE id = $3
    RETURNING *
  `,
    [payload.name, payload.phone, id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El contacto fue no encontrado');
  }
  return response.rows[0];
};

const contactsRepository = { getAll, addOne, deleteOneById, updateOneById };

export default contactsRepository;
