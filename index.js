const express = require('express')
const cookiesParser = require('cookie-parser');
const { title } = require('process');
const app = express()
const port = 3000

app.set('view engine', 'ejs')

//Aqui hacemos que USE los const descargados
app.use(express.urlencoded());
app.use(express.json());
app.use(cookiesParser());

app.get('/', (req, res) => {
    // sql
    res.render('index', { title: 'Mi primer web', name1: 'Test arriba', name2: 'Test abajo' });
})

isAuth = (req, res, next) => {
    if (req.cookies && req.cookies.user) {
        return next();
    }
    res.redirect('/login');
}

//Comentario para verificar el push
//test para ver si se ve en el issues
isAdmin = (req, res, next) => {
    if (req.cookies && req.cookies.admin) {
        return next();
    }
    res.redirect('/login');
}


// Esta es la ruta del login
app.get('/login', (req, res) => {
    //esto hace que nos envie al login (login.ejs)
    res.render('login', {
        title: 'Login',
        name1: 'Identificate',
        name2: 'Para continuar'
    });

})
app.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.clearCookie('admin');
    res.redirect('login');
})
app.get('/home', isAuth, (req, res) => {
    //leeriamos el usuario de la cookie
    //conslta en la bbdd del usuario
    //se lo enviamos por parametro al render
    res.render('home', {
        title: 'Bienvenido',
        name1: 'Usuario normal',
        name2: 'Puedes ver el contenido'
    });
})

app.get('/homeadmin', isAdmin, (req, res) => {
    res.render('homeadmin',{
        title: 'Bienvenido',
        name1: 'Usuario administrador',
        name2: 'Puedes ver el contenido de administrador'
    } )
})

// Esta es la ruta que gestiona el formulario del login
app.post('/login', (req, res) => {
    // user y password en el (name="") que hay en el login.ejs
    const { user, password } = req.body;
    if (user === 'adri' && password === '1234') {
        console.log('Login correcto usuario normal');
        res.cookie('user', user); //aqui meteriamos tmb las opciones - js no secure
        res.redirect('home');
    } else if (user === 'admin' && password === '1111') {
        console.log('Login correcto admin')
        res.cookie('admin', user); //aqui meteriamos tmb las opciones - js no secure
        res.redirect('homeadmin');
    } else {
        // res.send('Login incorrecto')
        res.status(401).redirect('login'); //no autorizado / Una menera de hacerlo
    }

})

// gestion de los parametros post
// app.post('/otramas', (req, res) => {
//     //manera 1
//     const { user, password } = req.body;
//     //manera 2
//     const user2 = req.body.user;
//     const password2 = req.body.password;
//     res.send('Otra más')
// })

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})