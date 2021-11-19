const mongoose = require('mongoose');

const doctorSchedule = mongoose.Schema({
    docID: {
        type: String,
        require: true
    },
    docName:{
        type: String,
        require: true
    },
    docSpecialization:{
        type: String,
        require: true
    },
    docSched:{
        type: DateTime,
        require: true 
    },
    datePosted:{
        type: Date,
        default: Date.now
    },
    availability:{
        type: String,
        require: true
    }
})