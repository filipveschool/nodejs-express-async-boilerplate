//
// Error handling
// -----------------------------------------------------------------------------

const PrettyError = require('pretty-error');

module.exports = app => {
  const pe = new PrettyError();

  pe.skipNodeFiles();
  pe.skipPackage('express');

  app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    res.status(err.status || 500);
  });
};
