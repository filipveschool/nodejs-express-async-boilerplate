const { EventEmitter } = require('events');

module.exports = app => {
  // Aggregate all profiler results into an event emitter to make
  // handling the results generic
  const profiles = new EventEmitter();

  profiles.on('route', ({ req, elapsedMS }) => {
    console.log(req.method, req.url, `${elapsedMS}ms`);
  });

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
};
