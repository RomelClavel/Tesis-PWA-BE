const express = require('express');
const { validationResult } = require('express-validator');
const Location = require('../models/Location');



//HAY QUE PROBAR TODO ESTO

const getLocations = async ( req, res = express.response ) => {

    const uid = req.uid; 

    const locations = await Location.find( {uid: uid} ); //populate() puede traeratributos de una referencia

    res.json({
        ok:true,
        locations
    });

}

const createLocation = async ( req, res = express.response ) => {


    const location = new Location( req.body );

    try {
        
        //Debemos guardar el uid del token, asegurar que sea valido
        location.uid = req.uid;

        const newLocation = await location.save();

        res.json({
            ok: true,
            location: newLocation
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj:'Algo fallo en el sistema'
        })
    }


  
}

const updateLocation = async ( req, res = express.response ) => {

    const locationId = req.params.id; //o _id
    const uid = req.uid; 


    try {
        

        const [location] = await Location.find( {lid: locationId} );

        if ( !location ) {

            return res.status(404).json({
                ok: false,
                msj: 'Location no existe'
            })
        }

        //Validación para confirmar que los usuario que lo mandan y al que peternece son los mismos
        if ( location.uid.toString() !==  uid) {

            return res.status(401).json({
                ok: false,
                msj: 'No tiene el privilegio de editar este location'
            })
        }

        const newLocation = {
            ...req.body,
            uid:uid
        }

        const updatedLocation = await Location.findByIdAndUpdate( location._id, newLocation, {new: true}/* retorna los dato que acabo de actualizar*/ );

        res.json({
            ok:true,
            location: updatedLocation
        })



    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msj: 'Error en metodo'
        })

    }


    

}

const deleteLocation = async ( req, res = express.response ) => {

    const locationId = req.params.id; //o _id
    const uid = req.uid; 


    try {
        

        const [location] = await Location.find( {lid: locationId} );

        if ( !location ) {

            return res.status(404).json({
                ok: false,
                msj: 'Location no existe'
            })
        }

        //Validación para confirmar que los usuario que lo mandan y al que peternece son los mismos
        if ( location.uid.toString() !==  uid) {

            return res.status(401).json({
                ok: false,
                msj: 'No tiene el privilegio de Borrar este Location'
            })
        }


        await Location.findByIdAndDelete( location._id );

        //BORRAR EL ID DE TODAS LAS ENTRADAS

        res.json({ ok:true });

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msj: 'Error en metodo'
        })

    }

}

module.exports = {
    getLocations,
    createLocation,
    updateLocation,
    deleteLocation,
    
}