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

export const addNewUser = (req, res) => {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      res.status(500).send(err);
    } else {
      bcrypt.hash(req.body.password, salt, (err2, hash) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          const newUser = new User({ username: req.body.username, password: hash, salt });
          newUser.save((err3, file) => {
            if (err3) {
              res.status(500).send(err3);
            } else {
              res.json(file);
            }
          });
        }
      });
    }
  });
};

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

export const updateUser = (req, res) => {
  User.findOne({ username: req.params.username }).lean().exec((err, currentUser) => {
    if (err) {
      res.status(500).send(err);
    } else if (req.body.password) {
      bcrypt.genSalt(SALT_WORK_FACTOR, (err2, salt) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          bcrypt.hash(req.body.password, salt, (err3, hash) => {
            if (err3) {
              res.status(500).send(err3);
            } else {
              const newUser = currentUser;
              newUser.password = hash;
              newUser.salt = salt;
              User.findOneAndUpdate({ username: req.params.username }, new User(newUser),
                { new: true }, (err4, updatedUser) => {
                  if (err4) {
                    res.status(500).send(err4);
                  } else {
                    res.json(updatedUser);
                  }
                });
            }
          });
        }
      });
    } else {
      res.status(400).end();
    }
  });
};

export const deleteUser = (req, res) => {
  User.findOneAndDelete({ username: req.params.username }, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).end();
    }
  });
};
