// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

export const UserSchema = new Schema({
    username: {
        type: String,
        required: 'Enter a username',
        index: { unique: true }
    },
    password: {
        type: String,
        required: 'Enter a password'
    }
});
