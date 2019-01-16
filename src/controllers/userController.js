import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('user', UserSchema);

export const addNewUser = (req, res) => {
    let newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};

export const getUsers = (req, res) => {
        User.find({}, (err, user) => {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
};

export const getUserByUsername = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};
