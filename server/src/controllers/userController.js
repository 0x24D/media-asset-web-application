import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('user', UserSchema);

export const getUsers = (req, res) => {
  User.find({}).lean().exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(user);
    }
  });
};

// /v1/users POST - create new user
export const addNewUser = (req, res) => {
  // TODO: implement
};

// /v1/users DELETE - delete all users
export const deleteAllUsers = (req, res) => {
  User.deleteMany({}, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).end();
    }
  });
};

export const getUserByUsername = (req, res) => {
  User.findOne({ username: req.params.username }).lean().exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(user);
    }
  });
};

// /v1/users/{username} PUT - update user
export const updateUser = (req, res) => {
  // TODO: implement
};

// /v1/users/{username} DELETE - delete specific user
export const deleteUser = (req, res) => {
  User.findOneAndDelete({ username: req.params.username }, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).end();
    }
  });
};
