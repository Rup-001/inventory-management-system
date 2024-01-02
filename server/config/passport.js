require("dotenv").config()

const User = require("../models/user.model")

const JwtStrategy = require('passport-jwt').Strategy
const  ExtractJwt = require('passport-jwt').ExtractJwt;
    const passport = require("passport")
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;


passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await User.findOne({ _id: jwt_payload.id }).exec();
        console.log("2");
// console.log('user', user);
console.log('user');
// console.log('jwt_payload', jwt_payload);
console.log('jwt_payload');
console.log("14");
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));
