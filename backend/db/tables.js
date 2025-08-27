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
  await db.query('DROP TABLE IF EXISTS activity');
  await db.query(`
    CREATE TABLE activity (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    img TEXT ,
    responsible TEXT NOT NULL,
    activity_status TEXT NOT NULL ,
    activity_type TEXT NOT NULL,
     date TIMESTAMPTZ DEFAULT NOW(),
    user_id INT NOT NULL REFERENCES users(id_codigo) ON DELETE CASCADE
    )
  `);

  console.log('Tabla de tareas creada');
};
const createCompletedTasksTable = async () => {
  await db.query('DROP TABLE IF EXISTS activity_completed');
  await db.query(`
    CREATE TABLE activity_completed   (
    id SERIAL PRIMARY KEY,
    description TEXT,
    img TEXT ,
    date TIMESTAMPTZ DEFAULT NOW(),
    user_id INTEGER NOT NULL REFERENCES users(id_codigo) ON DELETE CASCADE,
    activity_id INTEGER NOT NULL REFERENCES activity(id) ON DELETE CASCADE
    )
  `);

  console.log('Tabla de tareas completadas creada');
};

const createTables = async () => {
  await createUsersTable();
  await createTasksTable();
  await createCompletedTasksTable();

  console.log('Tablas creadas correctamente');
  process.exit();
};

createTables();
