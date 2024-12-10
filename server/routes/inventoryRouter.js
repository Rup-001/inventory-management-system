const express = require("express");
const InventoryRouter = express.Router();
const inventoryController = require("../controller/inventoryController");
// const passport = require('passport');
// require('../config/passport');
//const jwt = require('jsonwebtoken');

// const app = express();
// app.use(passport.initialize());

const isAdmin = require('../middleware/isAdmin');
const isEmployee = require('../middleware/isEmployee')

// add inventory route - POST
InventoryRouter.post("/addInventory", inventoryController.addInventory);

// get all inventory route - POST
InventoryRouter.get("/getAllInventory",  inventoryController.getAllInventory);


InventoryRouter.get('/inventory/location/:locationId', inventoryController.getInventoryByLocation);

// Route to get pending inventory records
InventoryRouter.get('/pending', inventoryController.getPendingInventory);

// Route to approve an inventory record by ID
InventoryRouter.put('/approve/:inventoryId', inventoryController.approveInventoryById);

// Route to reject an inventory record by ID
InventoryRouter.delete('/reject/:inventoryId', inventoryController.rejectInventoryById);

// passport.authenticate('jwt', { session: false }), isAdmin,

module.exports = InventoryRouter;