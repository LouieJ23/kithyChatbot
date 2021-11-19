const mongoose = require('mongoose');

const mission = mongoose.Schema({
    missionType: {
    type: String,
    require: true
    },
    missionDetails:{
        type: String,
        require: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
})
