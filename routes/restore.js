const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validation')
const { JWTValidator } = require('../middlewares/jwt-validation');
const { restoreData } = require('../controllers/restore');

//Validar el JWT antes de cada ruta
router.use( JWTValidator );


//Rutas
router.put(
    '/',
    [
        check('cards','cards no esta').not().isEmpty(),
        check('entries','entries no esta').not().isEmpty(),
        check('locations','locations no esta').not().isEmpty(),
        check('tags','tags no esta').not().isEmpty(),
        check('userSettings','userSettings no esta').not().isEmpty(),
    
        fieldValidator
    ],
    restoreData
    );


module.exports= router;