import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('user', UserSchema);

export const getUsers = (req, res) => {
        User.find({}).lean().exec((err, user) => {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
};

export const getUserByUsername = (req, res) => {
    User.findOne({ username: req.params.username }).lean().exec((err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};
