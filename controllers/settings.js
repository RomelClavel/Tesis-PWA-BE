const express = require('express');
const { validationResult } = require('express-validator');
const Settings = require('../models/Settings');

const getSettings = async ( req, res = express.response ) => {

    const uid = req.uid; 
    
    const settings = await Settings.find( {uid: uid} );  //populate() puede traeratributos de una referencia

    res.json({
        ok:true,
        settings
    });

}

const updateSettings = async ( req, res = express.response ) => {

    const settingsId = req.params.id; //o _id
    const uid = req.uid; 


    try {
        const [settings] = await Settings.find( {sid: settingsId} );

        if ( !settings ) {

            return res.status(404).json({
                ok: false,
                msj: 'Settings no existe'
            })
        }

        //Validación para confirmar que los usuario que lo mandan y al que peternece son los mismos
        if ( settings.uid !==  uid) {

            return res.status(401).json({
                ok: false,
                msj: 'No tiene el privilegio de editar este settings'
            })
        }

        const newSettings = {
            ...req.body,
            uid:uid
        }

        const updatedSettings = await Settings.findByIdAndUpdate( settings._id, newSettings, {new: true} /* retorna los dato que acabo de actualizar*/ );

        res.json({
            ok:true,
            card: updatedSettings
        })
s
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msj: 'Error en metodo'
        })

    }
}

module.exports = {
    getSettings,
    updateSettings,
}