const express = require("express");
const transferRouter = express.Router();
const transferController = require("../controller/transferController");

// const app = express();
// app.use(passport.initialize());

const isAdmin = require('../middleware/isAdmin');

transferRouter.post("/addTransfer", transferController.addTransfer);

transferRouter.get("/getEmpTransfers", transferController.getEmpTransfers);


module.exports = transferRouter;