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

// --- NUEVA FUNCIÓN ---
/**
 * Cuenta el número total de registros en la tabla de usuarios.
 * @returns {Promise<number>} El número total de usuarios.
 */
const countAll = async () => {
  try {
    // 1. Ejecutamos la consulta SQL para contar todas las filas.
    //    Usar "AS total" le da un nombre al campo del resultado para fácil acceso.
    const response = await db.query('SELECT COUNT(*) AS total FROM users');

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
const findByCodigo = async (payload) => {
  const response = await db.query(
    `
    SELECT * FROM users
    WHERE id_codigo = $1
  `,
    [payload.id_codigo],
  );
  return response.rows[0];
};
const usersRepository = { addOne, getAll, deleteOneById, countAll, findByCodigo };

export default usersRepository;
