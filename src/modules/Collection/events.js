const mongoose = require ('mongoose');

const eventsInfo = mongoose.Schema({
    eventTitle:{
        type: String,
        require: true
    },
    eventLocation:{
        type: String,
        require: true
    },
    eventInfo:{
        type: String,
        require: true
    },
    eventDate:{ 
        'startDateTime':{ 
            type: Date, 
            required: true }, 
            'endDateTime': { 
                type: Date, 
                required: true }
            },
    eventRequire:{
        type: String,
        require: true
    },
    eventProcess:{
        type: String,
        require: true
    },
    eventParticipant:{
        type: String,
        require: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
})

module.exports=mongoose.model('Events', eventsInfo);