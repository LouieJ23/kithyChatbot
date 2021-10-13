require("dotenv").config();
import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";
import bodyParser from "body-parser";
const dialogflow = require("dialogflow")
const {WebhookClient} = require('dialogflow-fulfillment');
//let app = express();

const app = express().use(bodyParser.json)
//config view engine
viewEngine(app);

//use body-parser to post data
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

//init all web routes
initWebRoute(app);

let port = process.env.PORT||8080;

app.listen(port, ()=> {
    console.log('App is running at the port ' +  port + "!");
});


app.post("/webhook", (request, response) => {
    // const agent = new WebhookClient({request: req, response: res});

    function welcome(agent) {
        agent.add('Welcome to my Agent!');
    }

    function WebHookProcessing(req, res) {
        const agent = new WebhookClient({request: req, response: res});
        console.info('agent set');

        let intentMap = new Map();
        intentMap.set('Default Welcome Intent', welcome);
        agent.handleRequest(intentMap);
    }
});


