const mongoose = require('mongoose');

const vision = mongoose.Schema({
   visionType: {
        type: String,
        require: true
        },
        visionDetails:{
            type: String,
            require: true
        },
        datePosted: {
            type: Date,
            default: Date.now
        }
})