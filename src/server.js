//import {dialogflow} from "actions-on-google";

require("dotenv").config();
import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";
const bodyParser = require('body-parser')
// import bodyParser from "body-parser";
const dialogflow = require('dialogflow');
const {WebhookClient} = require('dialogflow-fulfillment');
//const axios = require('axios');
//let app = express();

const app = express().use(bodyParser.json())

//config view engine
viewEngine(app);

//use body-parser to post data
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//'use strict';


// app.post('/webhook', (request, response) =>{
//     dialogflowfulfillment(request, response)
// })
//
// let dialogflowfulfillment = (request, response) => {
//     let agent = new WebhookClient({request, response})

app.post('/webhook', (request, response) =>{
     const _agent = new WebhookClient({request, response});

     function welcomeIntent(agent) {
         const welcome = agent.parameters.welcome;
         agent.add('This is from default welcome intent called: ' + welcome);
     }
        let intentMap = new Map();
        intentMap.set("Default Welcome Intent", welcomeIntent);
        _agent.handleRequest(intentMap).then();
})


    // function welcomeIntent(agent) {
    //     const welcome = agent.parameters.welcome;
    //     agent.add('This is from default welcome intent called: ' + welcome);
            //  return axios.get('/webhook')
            // .then((result) => {
            //     result.data.map(welcomeObj => {
            //         agent.add(welcomeObj.welcome);
            //         });
            // });

    // }

    // function fallback(agent) {
    //     agent.add('This is from default fallback intent called: ')
    // }
    //
    // let intentMap = new Map();
    // intentMap.set("Default Welcome Intent", welcomeIntent);
    // intentMap.set("Default Fallback Intent", fallback);
    // _agent.handleRequest(intentMap)

// }



//init all web routes
initWebRoute(app);
let port = process.env.PORT||8080;
app.listen(port, ()=> {
    console.log('App is running at the port ' +  port + "!");
});



