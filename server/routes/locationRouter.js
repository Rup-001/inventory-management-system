const express = require("express")
const locationRouter = express.Router();
const passport = require('passport');

const locationController = require('../controller/locationController');

//post location info
locationRouter.post("/location", passport.authenticate('jwt', { session: false }), locationController.branchLocation);

//get all location 
locationRouter.get("/allLocation", locationController.AllbranchLocation);
locationRouter.get("/location/count", locationController.countLocation);

//getUserWithLocation
locationRouter.get("/location/:userId", passport.authenticate('jwt', { session: false }), locationController.getUserWithLocation);

locationRouter.get("/locationwithUser/:locationId", locationController.getAllUserOfLocation);

module.exports = locationRouter;
