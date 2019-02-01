import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserSchema } from '../models/userModel';

const SALT_WORK_FACTOR = 10;
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
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      res.status(500).send(err);
    } else {
      bcrypt.hash(req.body.password, salt, (err2, hash) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          const newUser = new User({ username: req.body.username, password: hash });
          newUser.save((err3, file) => {
            if (err3) {
              res.status(500).send(err3);
            } else {
              res.status(200).json(file);
            }
          });
        }
      });
    }
  });
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
