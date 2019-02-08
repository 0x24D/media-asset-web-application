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
  token: {
    type: String,
  },
});
