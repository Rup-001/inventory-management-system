const express = require("express");
const Router = express.Router();
const profileController = require("./profileController");
const adminController = require("./adminController")
const passport = require('passport');
// const jwt = require('jsonwebtoken');

// const app = express();

// app.use(passport.initialize());




// Device profile route
Router.get('/employee/:username', passport.authenticate('jwt', { session: false }), profileController.deviceProfile);

// IT profile route
Router.get('/it/:username', passport.authenticate('jwt', { session: false }), profileController.itProfile);

// admin route for DASHBOARD
Router.get('/admin/:username/dashboard', passport.authenticate('jwt', { session: false }), adminController.adminDashboard);

// admin route for SHOW EMPLOYEE
Router.get('/admin/:username/showEmployee', passport.authenticate('jwt', { session: false }), adminController.showEmployee);

// Admin approve/reject registration route
Router.get('/admin/:username/showNewRegistration', passport.authenticate('jwt', { session: false }), adminController.showNewRegistration);

// Admin approve/reject registration route
Router.post('/admin/:username/approveRegistration', passport.authenticate('jwt', { session: false }), adminController.approveRegistration);


module.exports = Router;
