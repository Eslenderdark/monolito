## Descripción de la aplicación

Esta aplicación es un proyecto en **Node.js con Express** que incluye:

- Sistema de login básico con autenticación.
- Gestión de sesiones mediante cookies.
- Roles de usuario: **usuario** y **administrador**.
- Zonas privadas protegidas según el rol.
- Motor de plantillas **EJS** para generar vistas dinámicas.
- Base de datos **SQLite** para almacenar usuarios y roles.

El proyecto demuestra cómo crear rutas públicas y privadas, así como cómo protegerlas según el rol del usuario.

---

## Motor de plantillas (EJS)

- `header.ejs` → parte inicial de HTML.
- `footer.ejs` → cierre del HTML.
- Cada vista (`.ejs`) incluye header y footer para no repetir código.
- Variables `name1` y `name2` se pasan desde `index.js` para personalizar contenido.

---

## Base de datos (SQLite)

- Se usa `better-sqlite3` para crear la tabla de usuarios.
- Campos: `username`, `password` (hash) y `role` (`user` o `admin`).

---

## Autenticación y cookies

- Login compara usuario y contraseña con la base de datos.
- Cookies `user` o `admin` se crean según el rol.
- Logout elimina las cookies para proteger rutas privadas.

---

## Roles y rutas privadas

- Usuario → `/home`.
- Administrador → `/homeadmin`.
- Middleware `isAuth` y `isAdmin` protege las rutas según el rol.

---
