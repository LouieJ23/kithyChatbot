const mongoose = require('mongoose');

const centerInfo = mongoose.Schema({
    location:{
        type: String,
        require: true
    },
    hotline:{
        type: String,
        require: true
    },
    head:{
        type: String,
        require: true
    }


})