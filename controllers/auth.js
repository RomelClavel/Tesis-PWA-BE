const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Card = require('../models/Card');
const Settings = require('../models/Settings');
const { generateJWT } = require('../helpers/jwt');
const { months } = require('moment');
const { v4: uuidv4 } = require('uuid');
 

const createUser =  async  (req, res = express.response) => {

    const { email, password } = req.body 

    try{
        //validacion usuario unico
        let user = await User.findOne({ email: email});
        if ( user ){
            return res.status(400).json({ 
                ok:false,
                msj:'Existe un usuario con ese correo'
            })
        }


        user = new User( req.body );
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        //Generar JWT
        const token = await generateJWT( user.id );

        //Crear la instancia de Settings para el usuario
        
        let settings = new Settings({
            sid: uuidv4(),
            uid: user.id,
            name: "",
            description:"",
            photo:"",
            notification: {
                active: false,
                time: new Date(),  //Poner date
            },
            order: [ "photos", "tags", "locations", "weather" ],
            auth:false
        });

        await settings.save()
       

        //Crear las Cards Necesarias Para el Usuario
        let cards = []
        const years = [2020, 2021, 2022]
               
        for (let i = 0; i < years.length; i++) {
            for (let j = 0; j < 12; j++) {
                
                cards.push(
                    {
                        cid: uuidv4(),
                        uid: user.id,
                        month: j,
                        year: years[i],
                        photo: "",
                        color: "#D2D2D2",
                        entries:[]
                    }
                )
            }  
        }
        
        await Card.insertMany(cards);

        res.status(201).json({

            ok:true,
            msj:'register', 
            uid: user.id,
            email: user.email,
            token,
            cards,
            settings
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok:false,
            msj:'error'
        })
    }    
}


const loginUser = async (req, res = express.response) => {

    const {email, password} = req.body
    
    try {

        
        
        let user = await User.findOne({ email: email});
        if ( !user ){

            return res.status(400).json({ 
                ok:false,
                msj:'Usuario y Contraseña no son correctos'
            })
        }

        // Confirm password
        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword){
            return res.status(400).json({ 
                ok:false,
                msj:'Incorrect Password'
            })
        }

        //Generar el JWT
        const token = await generateJWT( user.id);

        res.json({
            ok:true,
            uid: user.id,
            email: user.email,
            token

        })


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok:false,
            msj:'error'
        })
    }    
}


const renewToken = async (req, res = express.response) => {

    const uid = req.uid;

    //Generamos nuevo JWT

    const token = await generateJWT( uid );

    res.json({

        ok:true,
        token,
        uid
        
    })
    
}

const getUserInfo = async (req, res = express.response) => {

    const uid = req.uid;

    const cards = await Card.find( {uid: uid} );  
    const settings = await Settings.find( {uid: uid} );  


    res.json({

        ok:true,
        uid, 
        cards,
        settings
    })
    
}



module.exports = {
    createUser,
    loginUser,
    renewToken,
    getUserInfo
}