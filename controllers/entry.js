const express = require('express');
const Card = require('../models/Card');
const { updateOne } = require('../models/Entry');
const Entry = require('../models/Entry');
const Location = require('../models/Location');
const Tag = require('../models/Tag');


const getEntries = async ( req, res = express.response ) => {

    const uid = req.uid; 

    const entries = await Entry.find( {uid: uid} ); //populate() puede traeratributos de una referencia

    res.json({
        ok:true,
        entries
    });

}

const createEntry = async ( req, res = express.response ) => {


    const entry = new Entry( req.body );

    try {
        
        //Debemos guardar el uid del token, asegurar que sea valido
        entry.uid = req.uid;

        const newEntry = await entry.save();

        //Añadir eid al arreglo de entries de Tags  
        if(entry.tags.length!==0){
            await Tag.updateMany(
                { tid : { $in: entry.tags } },
                { $push: { entries : entry.eid } }
            )
        }          
         

        //Añadir eid al arreglo de entries de Locations
        if (entry.location!==''){
            await Location.updateOne(
                { lid : entry.location },
                { $push: { entries : entry.eid } } ///MAL
            ) 
        }
        
        //Añadir eid al arreglo de entries de Cards
        await Card.updateOne(
            { cid: entry.cid },
            { $push: { entries: { e_id: entry.eid, e_date: entry.date.toString() } } } //Si hay un error revisar el to string
        )


        res.json({
            ok: true,
            entry: newEntry
        })

        


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj:'Algo fallo en el sistema'
        })
    }


  
}

const updateEntry = async ( req, res = express.response ) => {

    const entryId = req.params.id; //o _id
    const uid = req.uid; 


    try {
        

        const [entry] = await Entry.find( {eid: entryId} );

        if ( !entry ) {

            return res.status(404).json({
                ok: false,
                msj: 'Entry no existe'
            })
        }

        //Validación para confirmar que los usuario que lo mandan y al que peternece son los mismos
        if ( entry.uid.toString() !==  uid) {

            return res.status(401).json({
                ok: false,
                msj: 'No tiene el privilegio de editar esta entrada'
            })
        }

        const newEntry = {
            ...req.body,
            uid:uid
        }

        //Logica de editar los tags, locations o cards de ser necesario

        const updatedEntry = await Entry.findByIdAndUpdate( entry._id, newEntry, {new: true}/* retorna los dato que acabo de actualizar*/ );

        //Tag check
        const unselectedTags = entry.tags.filter( oldEid => !newEntry.tags.includes( oldEid ) ) //retorna elementos en Old que no estan en new
        const newSelectedTags = newEntry.tags.filter( newEid => !entry.tags.includes( newEid ) ) //retorna elementos en new que no estan en old

        //Borrar eid de los tags no selecionados
        if (unselectedTags.length!==0) {
            await Tag.updateMany(
                { tid: { $in: unselectedTags } },
                { $pull: { entries: newEntry.eid } }
            )
        }
        //Añadir eid a los tags nuevos
        if (newSelectedTags.length!==0) {

            await Tag.updateMany(
                { tid : { $in: newSelectedTags } },
                { $push: { entries : newEntry.eid } }
            )

        }

        if( entry.location !== newEntry.location){

            if(entry.location!=='') {
                await Location.updateOne(
                    { lid: entry.location },
                    { $pull: { entries: newEntry.eid } }
                )
            }

            if(newEntry.location!==''){
                await Location.updateOne(
                    { lid : newEntry.location },
                    { $push: { entries : newEntry.eid } }
                ) 
            }

        }

        if( entry.cid !== newEntry.cid ){

            await Card.updateOne(
                { cid: entry.cid },
                { $pull: { entries: { e_id: newEntry.eid } } } 
            )

            await Card.updateOne(
                { cid: newEntry.cid },
                { $push: { entries: { e_id: newEntry.eid, e_date: newEntry.date.toString() } } } //Si hay un error revisar el to string
            )

        }

        res.json({
            ok:true,
            entry: updatedEntry
        })



    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msj: 'Error en metodo'
        })

    }


    

}

const deleteEntry = async ( req, res = express.response ) => {

    const entryId = req.params.id; //o _id
    const uid = req.uid; 


    try {
        

        const [entry] = await Entry.find( {eid: entryId} );

        if ( !entry ) {

            return res.status(404).json({
                ok: false,
                msj: 'Entry no existe'
            })
        }

        //Validación para confirmar que los usuario que lo mandan y al que peternece son los mismos
        if ( entry.uid.toString() !==  uid) {

            return res.status(401).json({
                ok: false,
                msj: 'No tiene el privilegio de Borrar esta Entrada'
            })
        }


        await Entry.findByIdAndDelete( entry._id );

        await Tag.updateMany(
            { entries: entry.eid },
            { $pull: { entries: entry.eid } }
        )

        await Location.updateMany(
            { entries: entry.eid },
            { $pull: { entries: entry.eid } }
        )

        await Card.updateMany(
            { entries: entry.eid },
            { $pull: { 'entries.e_id': entry.eid } }
        )

        //Logica de borrar id de todas las cards, locations y tags a los que pertenece

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
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry,
    
}