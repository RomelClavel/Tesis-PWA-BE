const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { createUser, loginUser, renewToken, getUserInfo } = require('../controllers/auth')
const { fieldValidator } = require('../middlewares/field-validation')
const { JWTValidator } = require('../middlewares/jwt-validation');

//Routes
router.post(
    '/new',
    //Middlewares
    [
        check('email','Mensaje de error').isEmail(),
        check('password','Mensaje de error').not().isEmpty(),
        //hay otros validators mas 


        //Middleware para enviar error si los check no pasan
        fieldValidator
    ],
    
    createUser );

router.post(
    '/', 
    //Middlewares
    [
        check('email','Mensaje de error es aqui').isEmail(),
        check('password','Mensaje de error').not().isEmpty(),
        //hay otros validators mas 

        
        //Middleware para enviar error si los check no pasan
        fieldValidator
    ],
    loginUser);

    

router.get('/renew', JWTValidator, renewToken);


router.get('/info', JWTValidator, getUserInfo);





module.exports= router;