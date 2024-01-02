require("dotenv").config(); 
const express = require("express");
const app = express();
const cors = require("cors");
const ejs = require("ejs");
const JwtStrategy = require('passport-jwt').Strategy
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("./models/user.model");
const authRouter = require("./routes/authRouter")
const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productRouter")
const transactionRouter = require("./routes/transactionRouter")



const database = require("./config/database")
const passport = require('passport');
app.use(passport.initialize());
app.set("view engine", "ejs");
app.use(cors(
    {
        origin: '*'
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// product route
app.use('/api/product', productRouter) 

// Home, login, register route
app.use('/api/', authRouter)

//user route
app.use('/api/user', userRouter)

//transaction route
//app.use('/api/transac', transactionRouter)
app.use('/api/transaction', transactionRouter)

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