require("dotenv").config();
import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";
import bodyParser from "body-parser";

//const express = require('express')
//const bodyParser = require('body-parser')
//const app = express()
//const dialogflow = require("dialogflow")
//let app = express();
//const request = require('request-promise-native');
const {WebhookClient} = require('dialogflow-fulfillment');
let app = express().use(bodyParser.json)

//config view engine
viewEngine(app);

//use body-parser to post data
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init all web routes
initWebRoute(app);
let port = process.env.PORT||8080;
app.listen(port, ()=> {
    console.log('App is running at the port ' +  port + "!");
});



