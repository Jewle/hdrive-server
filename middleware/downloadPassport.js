const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const downloadPassport = require('passport')
const User = require('../models/User')
const File = require('../models/File')
const opts = {passReqToCallback: true}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

downloadPassport.use(new JwtStrategy(opts, function(req,jwt_payload, done) {
  const id = req.originalUrl.search('public')!==-1 ? req.originalUrl.split('/')[3] : ''
    User.findById(jwt_payload.id ,async function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            console.log('download passport')
            if (!id) return done(null,user)
           const file = await File.findById(id)
           const canDownload = file.canDownload.includes(user._id)
           const isPublic = file.isPublic
           const isOwner = file.userId === user._id
           if (canDownload || isPublic || isOwner) {
              return done(null,user)
           }else {
               return done(err,false)
           }

           
           return done(null,user)
        } else {
            return done(null, false);
            // or you could create a new account
        }
    }).select('id email name');
}));

module.exports = downloadPassport


