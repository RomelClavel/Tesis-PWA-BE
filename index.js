const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors')

// Crear el servidor de Express
const app = express();

// Data Base
dbConnection();

// Cors
app.use(cors()); //Algo necesario para la seguridad de la API 

//Parse bodies
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'));

app.use('/api/card', require('./routes/card'));

app.use('/api/settings', require('./routes/settings'));

app.use('/api/tag', require('./routes/tag'));

app.use('/api/location', require('./routes/location'));


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});