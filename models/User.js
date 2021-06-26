const { Schema, model } = require('mongoose');

const UserSchema = Schema({


    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    /*name: {
        type: String,
    },
    description: {
        type: String,
    },
    photo: {
        type: String,
    },
    notification: {
        active: Boolean,
        time: String,
    },
    order: [{
        type: String, //Preselect [photos, tags, locations, weather]
        required: true
    }]

    language : {
        type: Text
    }
*/
})


module.exports = model( 'User', UserSchema );