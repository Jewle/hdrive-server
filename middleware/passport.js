const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const User = require('../models/User')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload.id ,function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            console.log('simple passport')
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    }).select('id email name');
}));

module.exports = passport


