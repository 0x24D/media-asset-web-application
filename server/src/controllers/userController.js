import bcrypt from 'bcryptjs';
import {
  addNew,
  deleteAll,
  deleteByUsername,
  findAll,
  findByUsername,
  updateExistingByUsername,
} from '../db/userAccess';

const SALT_WORK_FACTOR = 10;

export const getUsers = (req, res) => {
  findAll((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(users);
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
          const newUser = { username: req.body.username, password: hash, salt };
          addNew(newUser, (err3, file) => {
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
  deleteAll((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).end();
    }
  });
};

export const getUserByUsername = (req, res) => {
  findByUsername(req.params.username, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(user);
    }
  });
};

export const updateUser = (req, res) => {
  const uName = req.params.username;
  findByUsername(uName, (err, currentUser) => {
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
              updateExistingByUsername(uName, newUser, (err4, updatedUser) => {
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
  deleteByUsername(req.params.username, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).end();
    }
  });
};
