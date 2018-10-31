// const express = require('express');
// const router = express.Router();
//
// const users = require('./users');
// router.use('/users', users);
//
// module.exports = router;

const _ = require('lodash');
const appRoot = require('app-root-path');
const fs = require('fs');
const validFileTypes = ['js'];
const excluded = ['index'];
const apiPrefixVersion = '/api/v2';

function requireFiles(directory, app) {
  fs.readdirSync(directory).forEach(fileName => {
    console.log(`fileName : ${fileName}`);

    // Remove extension from file name
    const basename = fileName.split('.')[0];
    console.log(`basename : ${basename}`);

    // Recurse if directory
    if (fs.lstatSync(`${directory}/${fileName}`).isDirectory()) {
      console.log('inside if');
      console.log(`${directory}/${fileName}`);
      requireFiles(`${directory}/${fileName}`, app);
    } else {
      // Skip this file
      if (fileName === 'index.js' && directory === __dirname) return;

      // Skip unknown filetypes
      if (validFileTypes.indexOf(fileName.split('.').pop()) === -1) return;

      console.log(`routes on prefix : /${basename}`);
      // Require the file.
      // eslint-disable-next-line global-require
      app.use(`${apiPrefixVersion}/${basename}`, require(`./${fileName}`));
    }
  });
}

module.exports = app => {
  requireFiles(__dirname, app);
};

// http://billpatrianakos.me/blog/2015/12/01/organizing-express-routes/

/**
 * Here we have a list of blacklisted file names.
 * The code here runs through all of the files in the routes/ directory and then mounts each one
 * as an Express middleware at the URL prefix that matches the file’s base name.
 * So for example, if a route file is named users.js then we’ll mount the file’s routes at /users.
 * It ends up being translated as app.use('/users', requiredFile).
 */
// module.exports = app => {
//   fs.readdirSync(__dirname).forEach(file => {
//     // dirname : C:\Users\fvandeney\Documents\GithubPrive\nodejs-express-async-boilerplate\api\routes
//     console.log(`dirname : ${__dirname}`);
//     // file : index.js
//     console.log(`file : ${file}`);
//
//     // Remove extension from file name
//     const basename = file.split('.')[0];
//     // basename : index
//     console.log(`basename : ${basename}`);
//
//     // Only load files that aren't directories and aren't blacklisted
//     if (
//       !fs.lstatSync(`${__dirname}/${file}`).isDirectory() &&
//       !_.includes(excluded, basename)
//     ) {
//       // eslint-disable-next-line global-require
//       app.use(`/${basename}`, require(`./${file}`));
//     }
//   });
// };
