const { Schema, model } = require('mongoose');

const TagSchema = Schema({

    tid: {
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
    entries:[{
        type: String,
    }]
})


module.exports = model( 'Tag', TagSchema );
