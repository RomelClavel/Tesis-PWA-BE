const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validation')
const { JWTValidator } = require('../middlewares/jwt-validation');
const { getEntries, createEntry, updateEntry, deleteEntry} = require('../controllers/entry')

//Validar el JWT antes de cada ruta
router.use( JWTValidator );


//Rutas
router.get( '/', getEntries )

router.post(
    '/new',
    [
        check('eid','eid no esta').not().isEmpty(),
        check('uid','uid no esta').not().isEmpty(),
        check('cid','cid no esta').not().isEmpty(),
        check('date','date no esta').not().isEmpty(),
        check('trash','latitude no esta').not().isEmpty(),

        fieldValidator
    ],
    createEntry
    )

router.put(
    '/:id',
    [
        check('eid','eid no esta').not().isEmpty(),
        check('uid','uid no esta').not().isEmpty(),
        check('cid','cid no esta').not().isEmpty(),
        check('date','date no esta').not().isEmpty(),
        check('trash','latitude no esta').not().isEmpty(),
    
        fieldValidator
    ],
    updateEntry
    );
    
router.delete('/delete/:id', deleteEntry );

module.exports= router;