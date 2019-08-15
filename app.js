const express   = require("express");
const bodyparser = require('body-parser');
const path      = require('path');
const app       = express();
const session   = require("express-session");
const passport  = require("passport");
const morgan    = require("morgan")
const moment    = require("moment")
const MongoClient = require('mongodb').MongoClient;

// Requiere de carpetas y Archivos
const web = require('./routes/web.js');
const {
    DB_URI
} = require('./config/config.json')
// require('./passport/passport.js')(passport);

//Configuraciones Generales
app.set('port', process.env.PORT || 8000)
// app.set('socket.io', io);

//MiddleWares
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    rolling:true,
    cookie: { 
        _expires : 600000
    }
}));

//CONFIGURACION DE APP
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'))

//INICIO DE SESION
// app.use(passport.initialize());
// app.use(passport.session());

// app.use((req,res,next)=>{
//     res.locals.user = req.user;
    
//     moment.locale('es');
//     app.locals.moment = moment;
//     next()
// })

//VARIABLES GLOBALES DEL PROYECTO PARA LAS VISTAS

//Archivo de rutas
app.use("/", web);

//Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(__dirname + '/public'))
app.use('/modules', express.static(__dirname + '/node_modules'))

//Subir el servidor
//MongoDB Connect and upload server
let dbo
MongoClient.connect(DB_URI, { useNewUrlParser: true })
    .then(client => {
        dbo = client.db('btravelers');
        console.log("Base de datos iniciada correctamente")
        
        //global variable for database
        // USE CONNECTION => req.app.locals.dbo 
        app.locals.dbo = dbo || null;

        //Subir el servidor
        app.listen(app.get('port'), () => {
            console.log("Servidor Arrancando en el puerto: " + app.get('port'))
        })

    })
    .catch(error => console.log("(ERROR) Error al iniciar base de datos", error));
