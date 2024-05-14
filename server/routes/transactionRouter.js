const express = require("express");
const transactionRouter = express.Router();
const transactionController = require ("../controller/transactionController")
const passport = require('passport');

//transaction HOME route
transactionRouter.get('/', passport.authenticate('jwt', { session: false }), transactionController.transactionHome)

//employee request for products
transactionRouter.post('/requestProduct', passport.authenticate('jwt', { session: false }), transactionController.requestProduct )

//admin view request for products
transactionRouter.get('/adminViewRequestedPrpoduct', passport.authenticate('jwt', { session: false }), transactionController.adminViewRequestedPrpoduct)

//admin approve the request
transactionRouter.post('/adminApproveRequest', passport.authenticate('jwt', { session: false }), transactionController.adminApproveRequest)

//handover from employee
transactionRouter.post('/handoverProduct', passport.authenticate('jwt', { session: false }), transactionController.handoverProduct)



module.exports = transactionRouter;



