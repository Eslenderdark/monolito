const Database = require('better-sqlite3');
const db = new Database('database.sqlite', { verbose: console.log });
const bcrypt = require('bcrypt');

// Crear la tabla "users"
const sentencia = db.prepare(`create table if not exists usersdb (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT unique,
    password TEXT,
    role TEXT
)`);

sentencia.run();

//insertar usuarios

const insertar = db.prepare(
  'insert or ignore into usersdb (username, password, role) values (?, ?, ?)',
);
// insertar.run('adri', '1234', 'user');
// insertar.run('admin', '1111', 'admin');

// hashear la contraseña
const hashedPwd = bcrypt.hashSync('1234', 10);
insertar.run('adri', hashedPwd, 'user');

const hashedPwd2 = bcrypt.hashSync('1111', 10);
insertar.run('admin', hashedPwd2, 'admin');
