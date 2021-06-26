const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validation')
const { JWTValidator } = require('../middlewares/jwt-validation');
const { getCards, updateCard } = require('../controllers/card')

//Validar el JWT antes de cada ruta
router.use( JWTValidator );


//Routes
router.get('/', JWTValidator, getCards);

router.put(
    '/:id',
    [
        check('uid','uid no esta').not().isEmpty(),
        check('month','month no esta').not().isEmpty(),
        check('year','year no esta').not().isEmpty(),

        fieldValidator
    ],
    updateCard
    );

module.exports= router;