'use strict';

const userService = require('../services/UserService');

// https://auth0.com/blog/developing-well-organized-apis-with-nodejs-joi-and-mongo/
class UserController {
  // constructor(log, userService, httpSatus) {
  //   this.log = log;
  //   this.userService = userService;
  //   this.httpSatus = httpSatus;
  // }

  constructor(log, userService, httpSatus) {
    this.log = log;
    this.userService = userService;
    this.httpSatus = httpSatus;
  }

  async listAll(req, res, next) {
    const users = await this.userService.listAll();
    res.status(200).json(users);
  }

  async create(req, res) {
    try {
      const { body } = req;
      const result = await this.userService.createUser(body);
      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }

  async get(req, res) {
    try{
      const { username } = req.params;
      const result = await this.userService.getUser(username);

      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }

}

module.exports = UserController;
