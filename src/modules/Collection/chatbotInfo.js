const mongoose = require ('mongoose');

const chatInfo = mongoose.Schema({
    id: {
        type: String, 
        required: true
    },
    type : {
        type: String,
        required: true
    },
    description: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String, 
        required: true
    },
    location : {
        type: String,
        required: true
    },
    age: {
        type: Date,
        default: Date.now
    }
});