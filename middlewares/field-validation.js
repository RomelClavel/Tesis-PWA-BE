const express = require('express')
const { validationResult } = require('express-validator');


const fieldValidator = (req, res = express.response, next) => {


    //Manejo de errores
    const errors = validationResult (req);

    if ( !errors.isEmpty()){
        return res.status(400).json({

            ok:false,
            errors: errors.mapped()

        })
    }

    //pasa al siguiente validator
    next();
}


module.exports = {
    fieldValidator
}