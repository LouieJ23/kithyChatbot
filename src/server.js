//import {dialogflow} from "actions-on-google";

require("dotenv").config();
import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";
const bodyParser = require('body-parser')
const dialogflow = require('dialogflow');
const {WebhookClient} = require('dialogflow-fulfillment');
const app = express().use(bodyParser.json())




//config view engine
viewEngine(app);

//use body-parser to post data
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


        //this code will get the intent triggered in dialogflow through json
        app.post("/webhook", function(request, response) {
        // let _agent = new WebhookClient({request,response});
        //const fulfillment = request.body.queryResult.fulfillmentText;
        const fulfillment = request.body.queryResult.fulfillmentMessages[0].text.text[0];
        const obj = {fulfillment};
        console.log("json string is" + JSON.stringify(obj));
        response.send(JSON.stringify(obj));

});

        //init all web routes
        initWebRoute(app);
        let port = process.env.PORT||8080;
        app.listen(port, ()=> {
                console.log('App is running at the port ' +  port + "!");
        });


// app.post('/webhook', (request, response) =>{
//     dialogflowfulfillment(request, response)
// })
//
// let dialogflowfulfillment = (request, response) => {
//     let agent = new WebhookClient({request, response})

// app.post('/webhook', (request, response) =>{
//      const _agent = new WebhookClient({request:request, response:response});
                // function welcomeIntent(agent) {
        //
        //     //const welcome = agent.parameters.welcome; --> this will show the intent name
        //     agent.add('This is from default welcome intent called: ' + welcome);
        // }
        // let intentMap = new Map();
        // intentMap.set("Default Welcome Intent", welcomeIntent);
        // _agent.handleRequest(intentMap).then();


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






