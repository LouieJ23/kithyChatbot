const express = require('express');
const router = express.Router();
const ProcessInfo = require('../modules/ProcessInfo');
const dialogflow = require('dialogflow');
const {WebhookClient} = require('dialogflow-fulfillment');
const Post = require('../modules/Post');


router.post("/", async (req, res)=>{
            let _agent = new WebhookClient((req,res)=>{
                    console.log(req.body);
            });
                
            console.log(req.body.processTitle);
            function welcomeIntent(agent) {
                    const input = req.body.queryResult.queryText;


                    if(input === "Just going to say hi")
                    {
                            agent.add("Hello there, how can I help you Louie?");
                            // agent.add(req.body.intent);
                            // agent.add(post[0].title);
                            console.log("This is the input: "+ input);
                            const fulfillment = req.body.queryResult.fulfillmentMessages[0].text.text[0];
                            const obj = {fulfillment};
                            console.log("json string is" + JSON.stringify(obj));
                            // console.log("intent body is "+req.body.intent);
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
            
            console.log("Request body = "+req.body);

});


router.get("/", (req, res)=>{
         

    res.send('This is the response: '+res.body);

});

module.exports=router;