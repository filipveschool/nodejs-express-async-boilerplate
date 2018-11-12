'use strict';

const UserModel = require('../models/User');

// https://auth0.com/blog/developing-well-organized-apis-with-nodejs-joi-and-mongo/
class UserService {
  constructor(log, mongoose, httpStatus, errs) {
    this.log = log;
    this.mongoose = mongoose;
    this.httpStatus = httpStatus;
    this.errs = errs;
  }

  async listAll() {
    return UserModel.find({});
  }

  async list({skip = 0, limit = 50} = {}){
    return UserModel.find().sort({createdAt: -1}).skip(skip).limit(limit).exec();
  }

  async createUser(body) {
    const {username} = body;
    const user = await UserModel.findOne({username});

    if (user) {
      return new Error('User with username already exists');
    }

    let newUser = new UserModel(body);
    newUser = await newUser.save();

    this.log.info('User Created Successfully');
    return newUser;
  }

  async getUser(username) {
    const user = await UserModel.findOne({username});

    if (!user) {
      return new Error( `User with username - ${username} does not exists`);
    }

    this.log.info('User fetched Successfully');
    return user;
  }

  async getUserById(userId) {
    const user = await UserModel.findById(userId);

    if (!user) {
      return new Error( `User with userId - ${userId} does not exists`);
    }

    this.log.info('User fetched Successfully');
    return user;
  }

  async replaceUser(userId, newUser){
    const result = await UserModel.findByIdAndUpdate(userId, newUser);
    return result;
  }

  async updateUser(userId, newUser){
    const result = await UserModel.findByIdAndUpdate(userId, newUser);
    return result;
  }

  async getUserCars(userId){
    const result = await UserModel.findById(userId).populate('cars');
    return result;
  }

  async newUserCars(userId, carsBody){
    const newCar = new Car(carsBody);
    // get user
    const user = await UserModel.findById(userId);
    // assign user as a car's seller
    newCar.seller = user;
    // save the car
    await newCar.save();
    //add car to the user's selling array car
    user.cars.push(newCar);
    //save the user
    const result = await user.save();

    return result;

  }
}

module.exports = UserService;
