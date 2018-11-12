const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');


module.exports = app => {
  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
      store: new MongoStore({
        url: process.env.MONGODB_URI,
        autoReconnect: true,
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
