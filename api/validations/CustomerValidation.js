const Joi = require('joi');

const createUser = Joi.object()
  .keys({
    username: Joi.string()
      .alphanum()
      .min(4)
      .max(15)
      .required(),
    birthdate: Joi.date().required(),
  })
  .required();

const updateUser = {
  body: {
    email: Joi.string().email(),
  },
  params: {
    userId: Joi.string()
      .hex()
      .required(),
  },
};

module.exports = {
  // GET /users
  listUsers: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.string(),
      email: Joi.string(),
      // role: Joi.string().valid(User.roles),
    },
  },

  createUser: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(128)
        .required(),
      name: Joi.string().max(128),
      // role: Joi.string().valid(User.roles),
    },
  },
  replaceUser: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(128)
        .required(),
      name: Joi.string().max(128),
      // role: Joi.string().valid(User.roles),
    },
  },
};
