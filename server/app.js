require("dotenv").config(); 
const express = require("express");
const app = express();
const cors = require("cors");
const ejs = require("ejs");
const JwtStrategy = require('passport-jwt').Strategy
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("./models/user.model");
const authRouter = require("./routes/authRouter")
const productRouter = require("./routes/productRouter")
const locationRouter = require("./routes/locationRouter")
const InventoryRouter= require("./routes/inventoryRouter")
const assignmnetRouter = require ('./routes/assignmentRouter')
const transferRouter = require('./routes/transferRouter')



//const transactionRouter = require("./extra/transactionRouter")
//const userRouter = require("./extra/userRouter")



const database = require("./config/database")
const passport = require('./config/passport');
app.use(passport.initialize());
app.set("view engine", "ejs");
app.use(cors(
    {
        origin: '*'
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('uploads'))


// product route
app.use('/api/product', productRouter) 

// Home, login, register route
app.use('/api/', authRouter)

//user route
//app.use('/api/user', userRouter)

//transaction route
//app.use('/api/transac', transactionRouter)
//app.use('/api/transaction', transactionRouter) //pre auth / emi er jonno creadit carf hoy

//location router
app.use('/api/', locationRouter)

//inventory router
app.use('/api/', InventoryRouter)

//assignment router
app.use('/api/', assignmnetRouter)

//transfer router
app.use('/api/', transferRouter)

// Not available route
app.use((req, res, next) => {
    res.send("Route not found");
});

// Server error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.send("Server error");
});

module.exports = app;