import mongoose from 'mongoose';
import { FileSchema } from '../models/fileModel';

const File = mongoose.model('file', FileSchema);

export const getFiles = (req, res) => {
    File.find({}).lean().exec((err, file) => {
        if (err) {
            res.send(err);
        } else {
            res.json(file);
        }
    });
};

export const addNewFile = (req, res) => {
    let newFile = new File({
        name: req.body.name,
        data: [{
            title: req.body.title,
            author: req.body.author,
            tags: req.body.tags
        }]
    });
    newFile.save((err, file) => {
        if (err) {
            res.send(err);
        } else {
            res.json(file);
        }
    });
};

export const deleteAllFiles = (req, res) => {
    File.deleteMany({}, (err) => {
        if (err) {
            res.send(err);
        } else {
            res.json({message: 'All files have been deleted'});
        }
    })
};

export const getFileById = (req, res) => {
    File.findById(req.params.id).lean().exec((err, file) => {
        if (err) {
            res.send(err);
        } else {
            res.json(file);
        }
    });
};
