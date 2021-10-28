const { Schema, model } = require('mongoose');

const SettingsSchema = Schema({

    sid: {
        type: String,
        required:true
    },
    uid: {
        type: String,
        required:true
    },
    name: {
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
        time: Date, //Type Date
    },
    order: [{
        type: String, //Preselect [photos, tags, locations, weather]
        required: true
    }],
    auth : {
        type: Boolean,
    }
})


module.exports = model( 'Settings', SettingsSchema );