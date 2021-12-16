
const { Schema, model } = require('mongoose');

const LocationSchema = Schema({

    lid: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        //required:true
    },
    latitude:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true
    },
    entries:[{
        type: String,
    }]


})


module.exports = model( 'Location', LocationSchema );
