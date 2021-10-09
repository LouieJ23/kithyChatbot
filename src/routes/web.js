import express from "express";
import homepageController from "../controllers/homepageController";
import chatBotController from "../controllers/chatBotController";
let router = express.Router();


/*let initWebRoutes = (app)=> {
    router.get("/", (req, res) => {
      return res.send("Hello World!");
    }); */

let initWebRoutes = (app)=> {
    router.get("/", homepageController.getHomepage);
    app.get("/webhook", chatBotController.getWebhook);
    app.post("/webhook", chatBotController.postWebhook);

    return app.use("/", router);
};

module.exports = initWebRoutes;