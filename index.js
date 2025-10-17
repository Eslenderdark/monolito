const express = require('express');
const cookiesParser = require('cookie-parser');
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Configuración de la base de datos
const db = new Database('database.sqlite', { verbose: console.log });

// Motor de plantillas
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookiesParser());

// Ruta principal
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Mi primer web',
    name1: 'Test arriba',
    name2: 'Test abajo',
  });
});

// Middleware de autenticación
const isAuth = (req, res, next) => {
  if (req.cookies && req.cookies.user) {
    return next();
  }
  res.redirect('/login');
};

const isAdmin = (req, res, next) => {
  if (req.cookies && req.cookies.admin) {
    return next();
  }
  res.redirect('/login');
};

// Ruta de login
app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    name1: 'Identifícate',
    name2: 'Para continuar',
  });
});

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.clearCookie('admin');
  res.redirect('login');
});

// Página para usuario normal
app.get('/home', isAuth, (req, res) => {
  res.render('home', {
    title: 'Bienvenido',
    name1: 'Usuario normal',
    name2: 'Puedes ver el contenido',
  });
});

// Página para administrador
app.get('/homeadmin', isAdmin, (req, res) => {
  res.render('homeadmin', {
    title: 'Bienvenido',
    name1: 'Usuario administrador',
    name2: 'Puedes ver el contenido de administrador',
  });
});

// Lógica de login
app.post('/login', (req, res) => {
  const { user, password } = req.body;

  const seleccionar = db.prepare('SELECT * FROM usersdb WHERE username = ?');
  const userdb = seleccionar.get(user);

  if (userdb && bcrypt.compareSync(password, userdb.password)) {
    if (userdb.role === 'admin') {
      console.log('Login correcto admin');
      res.cookie('admin', userdb);
      res.redirect('homeadmin');
    } else {
      console.log('Login correcto usuario');
      res.cookie('user', userdb);
      res.redirect('home');
    }
  } else {
    res.status(401).redirect('login');
  }
});

// Servidor en marcha
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
