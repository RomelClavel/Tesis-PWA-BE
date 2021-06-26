const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validation')
const { JWTValidator } = require('../middlewares/jwt-validation');
const { getTags, createTag, updateTag, deleteTag } = require('../controllers/tag')



//Validar el JWT antes de cada ruta
router.use( JWTValidator );


//Rutas
router.get( '/', getTags )

router.post(
    '/new',
    [
        check('lid','lid no esta').not().isEmpty(),
        check('uid','uid no esta').not().isEmpty(),
        check('name','name no esta').not().isEmpty(),
        //check('entries','uid no esta').not().isEmpty(),

        fieldValidator
    ],
    createTag
    )

router.put(
    '/:id',
    [
        check('lid','lid no esta').not().isEmpty(),
        check('uid','uid no esta').not().isEmpty(),
        check('name','name no esta').not().isEmpty(),
        //check('entries','entries no esta').not().isEmpty(),
    
        fieldValidator
    ],
    updateTag
    );
    
router.delete('/delete/:id', deleteTag );

module.exports= router;