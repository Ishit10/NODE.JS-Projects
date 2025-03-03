const passport = require("passport");
const userModel = require("../models/userModel");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy({ usernameField: "userName" }, async (userName, password, done) => {
    

      try {
        let getData = await userModel.findOne({ userName });
  
        if (getData.password == password) {
          return done(null, getData);
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.log(error);
        return done(null, false);
      }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await userModel.findById(id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error);
  }
});

passport.auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

passport.setUser = (req, res, next) => {
  res.locals.user = req.user;
  console.log(req.user);
  next();
};

module.exports = passport;