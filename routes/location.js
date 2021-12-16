const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validation')
const { JWTValidator } = require('../middlewares/jwt-validation');
const { getLocations, createLocation, updateLocation, deleteLocation} = require('../controllers/location')

//Validar el JWT antes de cada ruta
router.use( JWTValidator );


//Rutas
router.get( '/', getLocations )

router.post(
    '/new',
    [
        check('lid','lid no esta').not().isEmpty(),
        check('uid','uid no esta').not().isEmpty(),
        check('name','name no esta').not().isEmpty(),
        check('latitude','latitude no esta').not().isEmpty(),
        check('longitude','longitude no esta').not().isEmpty(),

        fieldValidator
    ],
    createLocation
    )

router.put(
    '/:id',
    [
        check('lid','lid no esta').not().isEmpty(),
        check('uid','uid no esta').not().isEmpty(),
        check('name','name no esta').not().isEmpty(),
        check('latitude','latitude no esta').not().isEmpty(),
        check('longitude','longitude no esta').not().isEmpty(),
    
        fieldValidator
    ],
    updateLocation
    );
    
router.delete('/delete/:id', deleteLocation );

module.exports= router;