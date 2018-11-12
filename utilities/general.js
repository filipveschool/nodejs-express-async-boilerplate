const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Get a random number between a min and max number
 * @param min
 * @param max
 * @returns {*}
 */
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomSMS = len => {
  const buf = [];
  const chars = '0123456789';
  const charlen = chars.length;

  for (let i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }
  return buf.join('');
};

const randomKey = len => {
  const buf = [];
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charlen = chars.length;

  for (let i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }
  return buf.join('');
};

module.exports = { capitalize, getRandomInt, randomSMS, randomKey };
