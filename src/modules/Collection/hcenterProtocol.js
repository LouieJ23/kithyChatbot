const { DateTime } = require('actions-on-google');
const mongoose = require('mongoose');

const protocolInfo = mongoose.Schema({
    protocolID:{
        type: String,
        require: true
    },
    protocolDetails:{
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});