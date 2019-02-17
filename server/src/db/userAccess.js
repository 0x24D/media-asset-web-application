import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('user', UserSchema);

export const addNew = (dataToSave, callback) => {
  const newUser = new User({
    username: dataToSave.username,
    password: dataToSave.password,
    salt: dataToSave.salt,
  });
  newUser.save((err, user) => {
    callback(err, user);
  });
};

export const deleteAll = (callback) => {
  User.deleteMany({}, (err) => {
    callback(err);
  });
};

export const deleteByUsername = (username, callback) => {
  User.findOneAndDelete({ username }, (err) => {
    callback(err);
  });
};

export const findAll = ((callback) => {
  User.find({}).lean().exec((err, users) => {
    callback(err, users);
  });
});

export const findByUsername = (username, callback) => {
  User.findOne({ username }).lean().exec((err, user) => {
    callback(err, user);
  });
};

export const updateExistingByUsername = (username, updatedUser, callback) => {
  User.findOneAndUpdate({ username }, new User(updatedUser),
    { new: true }, (err, user) => {
      callback(err, user);
    });
};
