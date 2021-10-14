//import {dialogflow} from "actions-on-google";

require("dotenv").config();
import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";
import bodyParser from "body-parser";
const {WebhookClient} = require('dialogflow-fulfillment');
let app = express();

//config view engine
viewEngine(app);

//use body-parser to post data
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/webhook', (request, response) =>{
    dialogflowfulfillment(request, response)
})

let dialogflowfulfillment = (request, response) => {
    let agent = new WebhookClient({request, response})

    function welcome(agent) {
        const welcome = agent.parameters.word;
        agent.add('This is from default welcome intent: ' + welcome);
    }

    function fallback(agent) {
        agent.add('This is from default fallback intent called: ')
    }

    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("Default Fallback Intent", fallback);
    agent.handleRequest(intentMap).then();

}



//init all web routes
initWebRoute(app);
let port = process.env.PORT||8080;
app.listen(port, ()=> {
    console.log('App is running at the port ' +  port + "!");
});



