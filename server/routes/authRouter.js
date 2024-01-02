const express = require("express");
const Router = express.Router();
const authController = require("../controller/authController");
const passport = require('passport');
const jwt = require('jsonwebtoken');

const app = express();

app.use(passport.initialize());

//home route
Router.get('/', authController.index )

// Register route - GET
 Router.get("/register", authController.getRegisterUser);

// Register route - POST
Router.post("/register", authController.registerUser);

//login route - GET
Router.get("/login", authController.GetloginUser)

// Login route - POST
Router.post("/login", authController.loginUser);

// Logout route
Router.get('/logout' , authController.logout);


module.exports = Router;
