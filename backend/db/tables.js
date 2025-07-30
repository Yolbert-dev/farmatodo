import db from './index.js';

const createUsersTable = async () => {
  await db.query('DROP TABLE IF EXISTS users');
  await db.query(`
    CREATE TABLE users (
    id_codigo INT PRIMARY KEY,
    passwordHash TEXT NOT NULL,
    name TEXT NOT NULL,
    rol TEXT NOT NULL
    )
  `);
  console.log('Tabla de usuarios creada');
};

const createTasksTable = async () => {
  await db.query('DROP TABLE IF EXISTS tasks');
  await db.query(`
    CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    descripcion TEXT,
    img TEXT NOT NULL,
    categoria TEXT NOT NULL,
    rol TEXT NOT NULL,
    user_id INT NOT NULL,
      CONSTRAINT fk_users
      FOREIGN KEY(user_id)
      REFERENCES users(id_codigo) 
      ON DELETE CASCADE
    )
  `);
  console.log('Tabla de usuarios creada');
};

const createTables = async () => {
  await createUsersTable();
  await createTasksTable();
  // await createContactsTable();
  console.log('Tablas creadas correctamente');
  process.exit();
};

createTables();
