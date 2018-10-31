const expressJwt = require('express-jwt');

module.exports = app => {
  //
  // Authentication
  // -----------------------------------------------------------------------------
  app.use(
    expressJwt({
      secret: auth.jwt.secret,
      credentialsRequired: false,
      getToken: req => req.cookies.id_token,
    }),
  );
  app.use(passport.initialize());

  app.get('/login/facebook',
    passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false }),
  );
  app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
    (req, res) => {
      const expiresIn = 60 * 60 * 24 * 180; // 180 days
      const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
      res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
      res.redirect('/');
    },
  );
};
