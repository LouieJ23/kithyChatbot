require("dotenv").config();
import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";
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
app.post("/webhook", (req, res) => {
        let _agent = new WebhookClient({request: req, response:res});

                const fulfillment = req.body.queryResult.fulfillmentMessages[0].text.text[0];
                const obj = {fulfillment};
                console.log("json string is" + JSON.stringify(obj));
                res.send(JSON.stringify(obj));

        function welcomeIntent(agent) {
                let input = "Just going to say hi";

                if(input === "Just going to say hi")
                        agent.add("Hello there, how can I help you Louie?");
        }
        function contact(agent) {
                let input = "What is your mobile phone contact?";

                if(input === "What is your mobile phone contact?")
                        agent.add('The contact number is: 09555555555');

        }
        let intentMap = new Map();
        intentMap.set('Default Welcome Intent', welcomeIntent);
        intentMap.set('Contact Information', contact);
        _agent.handleRequest(intentMap);
        });



//init all web routes
initWebRoute(app);
let port = process.env.PORT||8080;
app.listen(port, ()=> {
        console.log('App is running at the port ' +  port + "!");
});


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






