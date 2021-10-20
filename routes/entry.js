const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validation')
const { JWTValidator } = require('../middlewares/jwt-validation');
const { getEntries, createEntry, updateEntry, deleteEntry, trashEntry, untrashEntry} = require('../controllers/entry')

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
        check('trash','trash no esta').not().isEmpty(),
    
        fieldValidator
    ],
    updateEntry
    );
    
router.put(
    '/trash/:id',
    trashEntry
    );
    
router.put(
    '/untrash/:id',
    [
        check('eid','eid no esta').not().isEmpty(),
        check('cid','cid no esta').not().isEmpty(),
        check('trash','trash no esta').not().isEmpty(),
    
        fieldValidator
    ],
    untrashEntry
    );
    
router.delete('/delete', deleteEntry );

module.exports= router;