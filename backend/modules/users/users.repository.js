import db from '../../db/index.js';

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

const usersRepository = { addOne };

export default usersRepository;
