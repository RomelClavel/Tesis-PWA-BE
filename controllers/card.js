const express = require('express');
const { validationResult } = require('express-validator');
const Card = require('../models/Card');


const getCards = async ( req, res = express.response ) => {

    const uid = req.uid; 
    const cards = await Card.find( {uid: uid} );  //populate() puede traeratributos de una referencia
    
    res.json({
        ok:true,
        cards
    });

}

const updateCard = async ( req, res = express.response ) => {

    const cardId = req.params.id; //o _id
    const uid = req.uid; 

    console.log('cid ', cardId)
    console.log('vamos coño de la madre')

    try {
        const [card] = await Card.find( {cid: cardId} ); //Este ID no es el que es, hay que filtrar por el parametro correcto
        if ( !card ) {

            return res.status(404).json({
                ok: false,
                msj: 'Card no existe'
            })
        }

        //Validación para confirmar que los usuario que lo mandan y al que peternece son los mismos
        if ( card.uid !==  uid) {

            return res.status(401).json({
                ok: false,
                msj: 'No tiene el privilegio de editar este Card'
            })
        }

        const newCard = {
            ...req.body,
            uid:uid
        }

        //Le estoy pasando el ID que me da MongoDB, no el que usamos como tal
        const updatedCard = await Card.findByIdAndUpdate( card._id, newCard, {new: true} /* retorna los dato que acabo de actualizar*/ );

        res.json({
            ok:true,
            card: updatedCard
        })



    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msj: 'Error en metodo'
        })

    }


    

}

module.exports = {
    getCards,
    updateCard,
}




/*
Card = {
    cid: uuid,
    uid: uid,
    month: numero,
    year: numero,
    photo: "",
    color "#D2D2D2",
    entries:[]
}
*/