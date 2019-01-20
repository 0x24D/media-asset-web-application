import mongoose from 'mongoose';
import { FileSchema } from '../models/fileModel';

const File = mongoose.model('file', FileSchema);

export const getFiles = (req, res) => {
    File.find({}).lean().exec((err, file) => {
        if (err) {
            res.status(500).send(err);
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
            res.status(500).send(err);
        } else {
            res.json(file);
        }
    });
};

export const deleteAllFiles = (req, res) => {
    File.deleteMany({}, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(204).end();
        }
    })
};

export const getFileById = (req, res) => {
    File.findById(req.params.id).lean().exec((err, file) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(file);
        }
    });
};

export const deleteFile = (req, res) => {
    File.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(204).end();
        }
    })
};

export const getFileAndVersion = (req, res) => {
    File.findById(req.params.id).lean().exec((err, file) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const v = req.params.version - 1;
            res.json({
                _id: file._id,
                name: file.name,
                version: file.data[v].version,
                title: file.data[v].title,
                author: file.data[v].author,
                created_date: file.data[v].created_date,
                tags: file.data[v].tags
            });
        }
    });
};
