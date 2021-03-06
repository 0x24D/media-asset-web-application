import Paseto from 'paseto.js';
import bcrypt from 'bcryptjs';
import {
  findByProperty,
  unsetPropertyByUsername,
  updateExistingByUsername,
} from '../db/userAccess';

export const loginUser = (req, res) => {
  const unHashedPassword = req.body.password;
  let hashedPassword;
  findByProperty('username', req.body.username, (err, user) => {
    if (err) {
      res.status(500).send(
        {
          err: 'An error has occured logging in, please try again later',
          extended: err,
        },
      );
    } else if (user) {
      if (user.token) {
        res.status(409).end();
      } else {
        bcrypt.hash(unHashedPassword, user.salt, (err2, hash) => {
          if (err2) {
            res.status(500).send(
              {
                err: 'An error has occured logging in, please try again later',
                extended: err2,
              },
            );
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
                  updateExistingByUsername(user.username, newUser, (err3) => {
                    if (err3) {
                      res.status(500).send(
                        {
                          err: 'An error has occured logging in, please try again later',
                          extended: err3,
                        },
                      );
                    } else {
                      res.json({ token });
                    }
                  });
                });
            } else {
              res.status(500).send({ err: 'Username or password is not correct' });
            }
          }
        });
      }
    } else {
      res.status(500).send({ err: 'That username does not exist' });
    }
  });
};

export const logoutUser = (req, res) => {
  const tokenToCheck = req.headers.authorization;
  findByProperty('token', tokenToCheck, (err, user) => {
    if (err) {
      res.status(500).send(
        {
          err: 'An error has occured logging out, please try again later',
          extended: err,
        },
      );
    } else if (user && user.token === tokenToCheck) {
      unsetPropertyByUsername(user.username, { token: tokenToCheck }, (err2) => {
        if (err2) {
          res.status(500).send(
            {
              err: 'An error has occured logging out, please try again later',
              extended: err2,
            },
          );
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
    findByProperty('token', tokenFromUser, (err) => {
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
