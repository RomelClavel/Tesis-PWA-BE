const express = require('express');
const Card = require('../models/Card');
const Entry = require('../models/Entry');
const Location = require('../models/Location');
const Tag = require('../models/Tag');
const Settings = require('../models/Settings');


const restoreData = async ( req, res = express.response ) => {

    const uid = req.uid; 
    const backupData = req.body;
    
    try {
    
        //BORRAR TODO
        await Card.deleteMany( { "uid":uid } )
        await Entry.deleteMany( { "uid":uid } )
        await Location.deleteMany( { "uid":uid } )
        await Tag.deleteMany( { "uid":uid } )
        await Settings.deleteMany( { "uid":uid } )
        
        console.log('listo borrado')
       
       //CREAR TODO OTRA VEZ
       await Card.insertMany( backupData.cards )
       console.log('cards listo')
       await Entry.insertMany( backupData.entries )
       console.log('entries listo')
       await Location.insertMany( backupData.locations )
       console.log('locations listo')
       await Tag.insertMany( backupData.tags )
       console.log('tags listo')
       await Settings.create( backupData.userSettings )
       console.log('settings listo')


        res.json({
            ok:true,
        })



    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msj: error
        })

    } 
}

module.exports = {
    restoreData
}