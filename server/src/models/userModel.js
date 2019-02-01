// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
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
});
