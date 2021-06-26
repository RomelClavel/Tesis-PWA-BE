const express = require('express');
const { validationResult } = require('express-validator');
const Tag = require('../models/Tag');



//HAY QUE PROBAR TODO ESTO

const getTags = async ( req, res = express.response ) => {

    const uid = req.uid; 

    const tags = await Tag.find( {uid: uid} ); //populate() puede traeratributos de una referencia

    res.json({
        ok:true,
        tags
    });

}

const createTag = async ( req, res = express.response ) => {


    const tag = new Tag( req.body );

    try {
        
        //Debemos guardar el uid del token, asegurar que sea valido
        tag.uid = req.uid;

        const newTag = await tag.save();

        res.json({
            ok: true,
            tag: newTag
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj:'Algo fallo en el sistema'
        })
    }


    

}

const updateTag = async ( req, res = express.response ) => {

    const tagId = req.params.id; //o _id
    const uid = req.uid; 


    try {
        

        const [tag] = await Tag.find( {tid: tagId} );

        if ( !tag ) {

            return res.status(404).json({
                ok: false,
                msj: 'Tag no existe'
            })
        }

        //Validación para confirmar que los usuario que lo mandan y al que peternece son los mismos
        if ( tag.uid.toString() !==  uid) {

            return res.status(401).json({
                ok: false,
                msj: 'No tiene el privilegio de editar este tag'
            })
        }

        const newTag = {
            ...req.body,
            uid:uid
        }

        const updatedTag = await Tag.findByIdAndUpdate( tag._id, newTag, {new: true}/* retorna los dato que acabo de actualizar*/ );

        res.json({
            ok:true,
            tag: updatedTag
        })



    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msj: 'Error en metodo'
        })

    }


    

}

const deleteTag = async ( req, res = express.response ) => {

    const tagId = req.params.id; //o _id
    const uid = req.uid; 


    try {
        

        const [tag] = await Tag.find( {tid: tagId} );

        if ( !tag ) {

            return res.status(404).json({
                ok: false,
                msj: 'Tag no existe'
            })
        }

        //Validación para confirmar que los usuario que lo mandan y al que peternece son los mismos
        if ( tag.uid.toString() !==  uid) {

            return res.status(401).json({
                ok: false,
                msj: 'No tiene el privilegio de Borrar este tag'
            })
        }


        await Tag.findByIdAndDelete( tag._id );

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
    getTags,
    createTag,
    updateTag,
    deleteTag,
    
}