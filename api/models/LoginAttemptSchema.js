const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config/config');
const loginAttemptSchema = new Schema({
  ip: {
    type: String,
    default: '',
  },
  user: {
    type: String,
    default: '',
  },
  time: {
    type: Date,
    default: Date.now(),
    expires: config.throttleLoginAttempts.expires,
  },
});

/**
 * @typedef loginAttempt
 */
const loginAttempt = mongoose.model('LoginAttempt', loginAttemptSchema);

module.exports = loginAttempt;
