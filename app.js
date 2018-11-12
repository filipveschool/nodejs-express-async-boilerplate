/* eslint-disable import/order */
const debug = require('debug')('nodejs-express-async-boilerplate:server');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
const logger = require('morgan');
const compression = require('compression');
const cors = require("cors");
const uuid = require('uuid/v1');
const consolelogger = require('./server/logger');
const argv = require('./server/argv');
const port = require('./server/port');
const errorHandler = require('./server/middleware/errorMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;

require('dotenv');

const app = express();
// #####################################################################################################################
// #####################################################################################################################
// COMPRESSION
// #####################################################################################################################
// #####################################################################################################################
app.use(compression());

// Attach a unique identifier for the request. MongoDB ObjectIds are designed
// to have great performance and a high likelihood of uniqueness, even in
// distributed environments. A unique ID lets you tie multiple profiling results
// back to a single request.
app.use(wrap(function(req, res, next) {
  req.id = uuid();
  next();
}));


app.use(logger('dev'));
// app.use(express.json());
app.use(wrap(express.json()));
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(wrap(cookieParser()));
// app.use(helmet());
app.use(wrap(helmet()));
// app.use(cors());
app.use(wrap(cors()));


// #####################################################################################################################
// ERROR MIDDLEWARE
// #####################################################################################################################
// #####################################################################################################################
app.use(errorHandler);

// #####################################################################################################################
// #####################################################################################################################
// PRETTY ERROR HANDLING
// #####################################################################################################################
// #####################################################################################################################
require('./server/middleware/prettyErrorHandling')(app);



// https://www.lunchbadger.com/tracking-the-performance-of-express-js-routes-and-middleware/
//require('./server/performanceExpress')(app);
const { EventEmitter } = require('events');

// https://www.lunchbadger.com/tracking-the-performance-of-express-js-routes-and-middleware/
// Aggregate all profiler results into an event emitter to make
// handling the results generic
const profiles = new EventEmitter();

// https://www.lunchbadger.com/tracking-the-performance-of-express-js-routes-and-middleware/
profiles.on('route', ({ req, elapsedMS }) => {
  console.log(req.id.toString(), req.method, req.url, `${elapsedMS}ms`);
});

// https://www.lunchbadger.com/tracking-the-performance-of-express-js-routes-and-middleware/
profiles.on('middleware', ({ req, name, elapsedMS }) => {
  console.log(req.id.toString(), req.method, req.url, ':', name, `${elapsedMS}ms`);
});

// https://www.lunchbadger.com/tracking-the-performance-of-express-js-routes-and-middleware/
// Make sure you register this **before** other middleware
app.use((req, res, next) => {
  const start = Date.now();
  // The 'finish' event will emit once the response is done sending
  res.once('finish', () => {
    // Emit an object that contains the original request and the elapsed time in MS
    profiles.emit('route', { req, elapsedMS: Date.now() - start });
  });

  next();
});

// #####################################################################################################################
// #####################################################################################################################
// ROUTES
// #####################################################################################################################
// #####################################################################################################################
require('./api/routes/index')(app);

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

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

// https://www.lunchbadger.com/tracking-the-performance-of-express-js-routes-and-middleware/
function wrap(fn) {
// Function takes 2 arguments
  if (fn.length === 2) {
    return function(req, res) {
      const start = Date.now();
      res.once('finish', () => profiles.emit('middleware', {
        req,
        name: fn.name,
        elapsedMS: Date.now() - start
      }));
      return fn.apply(this, arguments);
    };
  } else if (fn.length === 3) {
    return function(req, res, next) {
      const start = Date.now();
      fn.call(this, req, res, function() {
        profiles.emit('middleware', {
          req,
          name: fn.name,
          elapsedMS: Date.now() - start
        });

        next.apply(this, arguments);
      });
    };
  } else {
    throw new Error('Function must take 2 or 3 arguments');
  }
}

module.exports = app;
