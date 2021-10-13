

require("dotenv").config();
import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";
import bodyParser from "body-parser";
//const dialogflow =require("dialogflow")
const {WebhookClient} = require('dialogflow-fulfillment');
let app = express();


//config view engine
viewEngine(app);

//use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init all web routes
initWebRoute(app);

let port = process.env.PORT||8080;

app.listen(port, ()=> {
    console.log('App is running at the port ' +  port + "!");
});


app.post("/webhook", (request, response) => {
    const _agent = new WebhookClient({request: request, response: response});

    function Welcome(agent) {
        agent.add('Welcome to my Agent!');
    }

    let intents = new Map();
    _agent.handleRequest(intents)

    intents.set("Default Welcome Intent", Welcome)
})


