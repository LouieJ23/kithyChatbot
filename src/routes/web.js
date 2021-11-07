import express from "express";
import homepageController from "../controllers/homepageController";
// import chatbotController from "../controllers/chatbotController";

let router = express.Router();



let initWebRoute = (app)=> {
    router.get("/", homepageController.getHomepage);
    // router.post("/webhook", chatbotController.postWebhook);
    // router.get("/webhook", chatbotController.getWebhook);
    return app.use("/", router);
};

module.exports = initWebRoute;