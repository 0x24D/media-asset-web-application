import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Enter a username',
    index: { unique: true },
  },
  password: {
    type: String,
    required: 'Enter a password',
  },
  salt: {
    type: String,
    required: 'Enter a salt',
  },
  token: {
    type: String,
  },
});
