const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
/*
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;*/
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({},
	(username, password, done) => {
		User.findOne({ username: username }, (err, user) => {
      if(err)
        return done(err);
      if(!user || !(user.validatePassword(password))){
        return done(null, false, { message: "Incorrect username or password." });
      }
      return done(null,user);
		});
	}
));
/*
passport.use( new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PUBLIC_KEY
  },
  function (jwtPayload, callback) {
    return User.findOne({username: jwtPayload.username})
    .then(user => {
      return callback(null, user);
    })
    .catch(err => {
      return callback(err);
    });
  })
);*/