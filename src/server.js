require("dotenv").config();
import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web.js";
const bodyParser = require('body-parser')
const dialogflow = require('dialogflow');
const {WebhookClient} = require('dialogflow-fulfillment');
const app = express().use(bodyParser.json())



//use body-parser to post data
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
        //this code will get the intent triggered in dialogflow through json
        // app.post("/webhook", function(request, response) {
        // // let _agent = new WebhookClient({request,response});
        //         const fulfillment = request.body.queryResult.fulfillmentMessages[0].text.text[0];
        //         const obj = {fulfillment};
        //         console.log("json string is" + JSON.stringify(obj));
        //         response.send(JSON.stringify(obj));
        //
        // });
 //init all web routes
 initWebRoute(app);
       
 let postWebhook=(req, res) => {
        let _agent = new WebhookClient({request: req, response:res});
        // Parse the request body from the POST
        let body = req.body;

        // Check the webhook event is from a Page subscription
        if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {

        // Gets the body of the webhook event
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);

        });

         // Return a '200 OK' response to all events
         res.status(200).send('EVENT_RECEIVED');

        } else {
            // Return a '404 Not Found' if event is not from a page subscription
            res.sendStatus(404);
        }
   
    

        function welcomeIntent(agent) {
                const input = req.body.queryResult.queryText;

                if(input === "Just going to say hi")
                {
                        agent.add("Hello there, how can I help you Louie?");
                        console.log("This is the input: "+ input);
                        const fulfillment = req.body.queryResult.fulfillmentMessages[0].text.text[0];
                        const obj = {fulfillment};
                        console.log("json string is" + JSON.stringify(obj));
                }
                else {
                        agent.add("Hello there, how can I help you man?");
                        console.log("This is the input: "+ input);
                        const fulfillment = req.body.queryResult.fulfillmentMessages[0].text.text[0];
                        const obj = {fulfillment};
                        console.log("json string is" + JSON.stringify(obj));
                }
        }
        function contact(agent) {
               const input = req.body.queryResult.queryText;
               console.log("This is the input: " + input);
                if(input === "What is your mobile phone contact?") {
                        agent.add('The contact number is: 09555555555');
                        console.log("This is the response: " + res);
                }
                       else if (input !== "What is your mobile phone contact?")
                {
                                console.log("This is the input: " + input);
                                const fulfillment = req.body.queryResult.fulfillmentMessages[0].text.text[0];
                                const obj = {fulfillment};
                                console.log("json string is" + JSON.stringify(obj));
                                res.send(JSON.stringify(obj));

                }
        }

        function fallback (){
                const fulfillment = req.body.queryResult.fulfillmentMessages[0].text.text[0];
                const obj = {fulfillment};
                console.log("json string is" + JSON.stringify(obj));
                res.send(JSON.stringify(obj));
        }
        let intentMap = new Map();
        intentMap.set('Default Welcome Intent', welcomeIntent);
        intentMap.set('Contact Information', contact);
        intentMap.set('Default Fallback Intent', fallback);
        _agent.handleRequest(intentMap);
};
     
// app.post("/webhook", (req, res) => {
//         let _agent = new WebhookClient({request: req, response:res});


//         function welcomeIntent(agent) {
//                 const input = req.body.queryResult.queryText;

//                 if(input === "Just going to say hi")
//                 {
//                         agent.add("Hello there, how can I help you Louie?");
//                         console.log("This is the input: "+ input);
//                         const fulfillment = req.body.queryResult.fulfillmentMessages[0].text.text[0];
//                         const obj = {fulfillment};
//                         console.log("json string is" + JSON.stringify(obj));
//                 }
//                 else {
//                         agent.add("Hello there, how can I help you man?");
//                         console.log("This is the input: "+ input);
//                         const fulfillment = req.body.queryResult.fulfillmentMessages[0].text.text[0];
//                         const obj = {fulfillment};
//                         console.log("json string is" + JSON.stringify(obj));
//                 }
//         }
//         function contact(agent) {
//                const input = req.body.queryResult.queryText;
//                console.log("This is the input: " + input);
//                 if(input === "What is your mobile phone contact?") {
//                         agent.add('The contact number is: 09555555555');
//                         console.log("This is the response: " + res);
//                 }
//                        else if (input !== "What is your mobile phone contact?")
//                 {
//                                 console.log("This is the input: " + input);
//                                 const fulfillment = req.body.queryResult.fulfillmentMessages[0].text.text[0];
//                                 const obj = {fulfillment};
//                                 console.log("json string is" + JSON.stringify(obj));
//                                 res.send(JSON.stringify(obj));

//                 }
//         }

//         function fallback (){
//                 const fulfillment = req.body.queryResult.fulfillmentMessages[0].text.text[0];
//                 const obj = {fulfillment};
//                 console.log("json string is" + JSON.stringify(obj));
//                 res.send(JSON.stringify(obj));
//         }
//         let intentMap = new Map();
//         intentMap.set('Default Welcome Intent', welcomeIntent);
//         intentMap.set('Contact Information', contact);
//         intentMap.set('Default Fallback Intent', fallback);
//         _agent.handleRequest(intentMap);
//         });

        // app.get((req, res)=>{
        //         console.log(res);
        // });

        app.get((req, res) => {
                // Your verify token. Should be a random string.
                let VERIFY_TOKEN = "FACEBOOK_PAGE_ACCESS_TOKEN"
            
                // Parse the query params
                let mode = req.query['hub.mode'];
                let token = req.query['hub.verify_token'];
                let challenge = req.query['hub.challenge'];
            
                // Checks if a token and mode is in the query string of the request
                if (mode && token) {
            
                    // Checks the mode and token sent is correct
                    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            
                        // Responds with the challenge token from the request
                        console.log('WEBHOOK_VERIFIED');
                        res.status(200).send(challenge);
            
                    } else {
                        // Responds with '403 Forbidden' if verify tokens do not match
                        res.sendStatus(403);
                    }
                }

                console.log('This is the response: '+res);
            });
            


let port = process.env.PORT||8080;
app.listen(port, ()=> {
        console.log('App is running at the port ' +  port + "!");
});





