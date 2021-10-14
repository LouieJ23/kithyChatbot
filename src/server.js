require("dotenv").config();
import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";
import bodyParser from "body-parser";

//const express = require('express')
//const bodyParser = require('body-parser')
//const app = express()
//const dialogflow = require("dialogflow")
let app = express();
//const request = require('request-promise-native');
const {WebhookClient} = require('dialogflow-fulfillment');
//let app = express().use(bodyParser.json)

//config view engine
viewEngine(app);

//use body-parser to post data
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*app.get("/", function(req,res) {
        res.send('<h1> This is my web app</h1>');
    });
*/
app.post("/webhook", function(req,res) {
    let intent = req.body.queryResult.intent.displayName;
    let obj = {fulfillmentText: "The intent name is: " + intent};
    console.log("json string is:" + JSON.stringify(obj));
    res.send(JSON.stringify(obj));

    let agent = new WebhookClient({request: req, response: res});
    function welcome(agent) {
        agent.add('Welcome to my agent!');
    }
    let intents = new Map();
    intents.set("Default Welcome Intent", welcome)
    agent.handleRequest(intents)

});


//init all web routes
initWebRoute(app);
let port = process.env.PORT||8080;
app.listen(port, ()=> {
    console.log('App is running at the port ' +  port + "!");
});



