const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const saltRounds = 10;

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    twitter: String,
    google: String,
    github: String,
    instagram: String,
    linkedin: String,
    steam: String,
    tokens: Array,

    profile: {
      name: String,
      gender: String,
      location: String,
      website: String,
      picture: String,
    },
    cars: [{
      type: Schema.Types.ObjectId,
      ref: 'car',
    }]
  },
  { timestamps: true },
);

// /**
//  * Password hash middleware.
//  */
// userSchema.pre('save', function save(next) {
//   const user = this;
//   if (!user.isModified('password')) { return next(); }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) { return next(err); }
//     bcrypt.hash(user.password, salt, null, (err, hash) => {
//       if (err) { return next(err); }
//       user.password = hash;
//       next();
//     });
//   });
// });

// https://auth0.com/blog/hashing-in-action-understanding-bcrypt/
// https://blog.readme.io/using-async-await-in-node-js-7-6-0/
/**
 * Password hash middleware.
 */
userSchema.pre('save', async function save(next) {
  try {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    const salt = await bcrypt.genSalt(10);

    // hash the password along with our new salt
    const hash = await bcrypt.hash(user.password, salt);

    // override the cleartext password with the hashed one
    user.password = hash;
    return next();
  }catch (e) {
    return next(e);
  }
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
