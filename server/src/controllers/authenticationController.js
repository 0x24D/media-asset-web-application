import mongoose from 'mongoose';
import Paseto from 'paseto.js';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('user', UserSchema);

export const loginUser = (req, res) => {
  User.findOne({ username: req.body.username }).lean().exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (user.password === req.body.password) {
      const encoder = new Paseto.V2();
      encoder.symmetric()
        .then((sk) => {
          const message = `${user.username}+${Date.now()}`;
          return encoder.encrypt(message, sk);
        })
        .then((token) => {
          const newUser = user;
          newUser.token = token;
          User.findOneAndUpdate({ username: user.username }, new User(newUser), (err2) => {
            if (err2) {
              res.status(500).send(err2);
            } else {
              res.json({ token });
            }
          });
        });
    } else {
      res.status(500).end();
    }
  });
};

export const logoutUser = (req, res) => {
  const tokenToCheck = req.headers.authorization;
  console.log(tokenToCheck);
  User.findOne({ token: tokenToCheck }).lean().exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (user && user.token === tokenToCheck) {
      User.findOneAndUpdate({ username: user.username },
        { $unset: { token: tokenToCheck } }, (err2) => {
          if (err2) {
            console.log(`Error: ${err2}`);
            res.status(500).send(err2);
          } else {
            res.json({ msg: 'Please remove your token' }); // TODO: client side  - remove from storage (localstorage or cookie)
          }
        });
    } else {
      res.status(401).end();
    }
  });
};

export const isUserAuthenticated = (req, res, next) => {
  console.log('isUserAuthenticated middleware called');
  const tokenFromUser = req.headers.authorization;
  if (tokenFromUser) {
    User.findOne({ token: tokenFromUser }).lean().exec((err) => {
      if (err) {
        res.status(401).end();
      } else {
        next();
      }
    });
  } else {
    res.status(401).end();
  }
};
