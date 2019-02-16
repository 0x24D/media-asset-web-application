import mongoose from 'mongoose';
import Paseto from 'paseto.js';
import bcrypt from 'bcryptjs';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('user', UserSchema);

export const loginUser = (req, res) => {
  const unHashedPassword = req.body.password;
  let hashedPassword;
  User.findOne({ username: req.body.username }).lean().exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      bcrypt.hash(unHashedPassword, user.salt, (err3, hash) => {
        if (err3) {
          res.status(500).send(err3);
        } else {
          hashedPassword = hash;
          if (user.password === hashedPassword) {
            const encoder = new Paseto.V2();
            encoder.symmetric()
              .then((sk) => {
                const message = `${user.username}+${Date.now()}`;
                return encoder.encrypt(message, sk);
              })
              .then((token) => {
                const newUser = user;
                newUser.token = token;
                User.findOneAndUpdate({ username: user.username },
                  new User(newUser), (err4) => {
                    if (err4) {
                      res.status(500).send(err4);
                    } else {
                      res.json({ token });
                    }
                  });
              });
          } else {
            res.status(500).send({ err: 'Provided password is not correct' });
          }
        }
      });
    }
  });
};

export const logoutUser = (req, res) => {
  const tokenToCheck = req.headers.authorization;
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
            res.status(204).end();
          }
        });
    } else {
      res.status(401).end();
    }
  });
};

export const isUserAuthenticated = (req, res, next) => {
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
