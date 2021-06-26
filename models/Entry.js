/*
const { Schema, model } = require('mongoose');

Reevaluar los valores de require

const EntrySchema = Schema({

    eid: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true,
        
    },
    cid: {
        type: String,
        required: true,
    },
    photos:[{
        photo: String,
        thumbnail: Boolean
    }],
    date: {
        type: Date,
        required:true
    },
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    weather: {
        type: String, //Preselect
    },
    trash: {
        type: Boolean,
        required:true
    },
    tags:[{
        t_id; String,
    }],
    location: {
        l_id: String,
    }

})


module.exports = model( 'Entry', EntrySchema ); 
*/