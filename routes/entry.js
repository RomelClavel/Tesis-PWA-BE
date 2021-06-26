const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validation')
const { JWTValidator } = require('../middlewares/jwt-validation');


//Validar el JWT antes de cada ruta
router.use( JWTValidator );


//Rutas