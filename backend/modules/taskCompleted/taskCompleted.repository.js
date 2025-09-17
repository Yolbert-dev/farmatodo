import db from '../../db/index.js';

const getAll = async () => {
  const response = await db.query('SELECT * FROM activity_completed');
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO activity_completed (description,img,user_id, activity_id)
    VALUES ($1, $2, $3, $4) RETURNING *
  `,
    [payload.description, payload.img, payload.user_id, payload.activity_id],
  );
  return response.rows[0];
};

const countAll = async () => {
  try {
    // 1. Ejecutamos la consulta SQL para contar todas las filas.
    //    Usar "AS total" le da un nombre al campo del resultado para fácil acceso.
    const response = await db.query('SELECT COUNT(*) AS total FROM activity_completed');

    // 2. El resultado de COUNT(*) es una fila con una columna.
    //    Accedemos a ella a través de response.rows[0].total.
    //    El valor puede venir como string, así que usamos parseInt para asegurar que es un número.
    const count = parseInt(response.rows[0].total, 10);

    return count;
  } catch (error) {
    console.error('Error en el repositorio al contar usuarios:', error);
    // Lanzamos un error genérico para que el router lo maneje.
    throw new Error('No se pudo obtener el conteo de usuarios desde la base de datos.');
  }
};

const contactsRepository = { getAll, addOne, countAll };

export default contactsRepository;
