
const { Schema, model } = require('mongoose');

const CardSchema = Schema({

    cid: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true,
    },
    month: {
        type: Number,
        required:true
    },
    year: {
        type: Number,
        required:true
    },
    photo: {
        type: String,
    },
    color: {
        type: String,
    },
    entries: [{
        e_id: String,
        e_date: String
    }]


})


module.exports = model( 'Card', CardSchema );
