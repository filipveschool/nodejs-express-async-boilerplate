/* eslint-disable import/order */
const debug = require('debug')('nodejs-express-async-boilerplate:server');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const consolelogger = require('./server/logger');
const argv = require('./server/argv');
const port = require('./server/port');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
// #####################################################################################################################
// #####################################################################################################################
// COMPRESSION
// #####################################################################################################################
// #####################################################################################################################
app.use(compression())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// #####################################################################################################################
// #####################################################################################################################
// ROUTES
// #####################################################################################################################
// #####################################################################################################################
app.use('/', indexRouter);
app.use('/users', usersRouter);

// #####################################################################################################################
// #####################################################################################################################
// get the intended host and port number, use localhost and port 3000 if not provided
// #####################################################################################################################
// #####################################################################################################################
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// #####################################################################################################################
// #####################################################################################################################
// use the gzipped bundle
// #####################################################################################################################
// #####################################################################################################################
// app.get('*.js', (req, res, next) => {
//   req.url = req.url + '.gz'; // eslint-disable-line
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

// #####################################################################################################################
// #####################################################################################################################
// START YOUR APP
// #####################################################################################################################
// #####################################################################################################################

app.listen(port, host, async err => {
  if (err) {
    return consolelogger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return consolelogger.error(e);
    }
    consolelogger.appStarted(port, prettyHost, url);
  } else {
    consolelogger.appStarted(port, prettyHost);
  }
});
