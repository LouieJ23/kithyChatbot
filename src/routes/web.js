import express from "express";
import homepageController from "../controllers/homepageController";
//mport chatBotController from "../controllers/chatBotController";
let router = express.Router();



let initWebRoutes = (app)=> {
    router.get("/", homepageController.getHomepage);
    router.get("/webhook", server.getWebhook);
    router.post("/webhook", server.postWebhook);

    return app.use("/", router);
};

module.exports = initWebRoutes;