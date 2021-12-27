const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors')
const admin = require('firebase-admin');
const serviceAccount = require('./fcm-admin-credentials.json');

const interval = require('./helpers/intervalFunc');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// Crear el servidor de Express
const app = express();

// Data Base
dbConnection();

// Cors
app.use(cors()); //Algo necesario para la seguridad de la API 

//Parse bodies
app.use( express.json({limit: '10mb'}) ); //Permite aumentar el limite de tamaño de los objetos que se crean

//Rutas
app.use('/api/auth', require('./routes/auth'));

app.use('/api/card', require('./routes/card'));

app.use('/api/settings', require('./routes/settings'));

app.use('/api/tag', require('./routes/tag'));

app.use('/api/location', require('./routes/location'));

app.use('/api/entry', require('./routes/entry'));

app.use('/api/restore', require('./routes/restore'));

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});


/*

1 Buscar todas las notificaciones que se hagan en esa hora y minuto
2 enviar la misma notificacion a todos

*/

setInterval(interval.intervalFunc, 60000);




