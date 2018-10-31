const express = require('express');
const router = express.Router();

const routeConstants = {
  getAll: '/all',
  getAllusers: '/all',
  getUserById: '/:id',
  postCreateUser: '/create',
  putUpdateUser: '/:id',
  deleteUserById: '/destroy/:id',
};

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({ title: 'respond with a resource' });
});

// router.post();

module.exports = router;
