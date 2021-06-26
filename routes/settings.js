const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validation')
const { JWTValidator } = require('../middlewares/jwt-validation');
const {getSettings, updateSettings } =require('../controllers/settings')


//Validar el JWT antes de cada ruta
router.use( JWTValidator );

//Routes

router.get('/', JWTValidator, getSettings);

router.put(
    '/:id',
    [
        check('uid','uid no esta').not().isEmpty(),
        check('sid','sid no esta').not().isEmpty(),
    

        fieldValidator
    ],
    updateSettings
    );

module.exports= router;