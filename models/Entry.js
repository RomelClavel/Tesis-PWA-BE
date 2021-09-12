
const { Schema, model } = require('mongoose');


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
        type: String, 
    },
    trash: {
        type: Boolean,
        required:true
    },
    tags:[{
        type: String,
    }],
    location: {
        type: String,
    }

})


module.exports = model( 'Entry', EntrySchema ); 
