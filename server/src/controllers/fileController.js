import mongoose from 'mongoose';
import { FileSchema } from '../models/fileModel';

const File = mongoose.model('file', FileSchema);

export const getFiles = (req, res) => {
  File.find({}).lean().exec((err, files) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const arrayOfFiles = [];
      files.forEach((file) => {
        const v = file.data.length - 1;
        const fileJson = {
          _id: file._id,
          name: file.name,
          version: file.data[v].version,
          title: file.data[v].title,
          author: file.data[v].author,
          created_date: file.data[v].created_date,
          tags: file.data[v].tags,
        };
        arrayOfFiles.push(fileJson);
      });
      res.json(arrayOfFiles);
    }
  });
};

export const addNewFile = (req, res) => {
  const newFile = new File({
    name: req.body.name,
    data: [{
      title: req.body.title,
      author: req.body.author,
      tags: req.body.tags,
    }],
  });
  newFile.save((err, file) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(file);
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
  });
};

export const getFileById = (req, res) => {
  File.findById(req.params.id).lean().exec((err, file) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const v = file.data.length - 1;
      res.json({
        _id: file._id,
        name: file.name,
        version: file.data[v].version,
        title: file.data[v].title,
        author: file.data[v].author,
        created_date: file.data[v].created_date,
        tags: file.data[v].tags,
      });
    }
  });
};

export const updateFile = (req, res) => {
  File.findById(req.params.id).lean().exec((err, currentFile) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const newFile = currentFile;
      newFile.locked = false;
      newFile.data[currentFile.data.length] = {
        version: currentFile.data.length + 1,
        title: req.body.title,
        author: req.body.author,
        tags: req.body.tags,
      };
      File.findOneAndUpdate({ _id: req.params.id }, new File(newFile),
        { new: true }, (err2, updatedFile) => {
          if (err2) {
            res.status(500).send(err2);
          } else {
            res.json(updatedFile);
          }
        });
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
  });
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
        tags: file.data[v].tags,
      });
    }
  });
};

export const lockFile = (req, res) => {
  File.findById(req.params.id).lean().exec((err, currentFile) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const newFile = currentFile;
      newFile.locked = true;
      File.findOneAndUpdate({ _id: req.params.id }, new File(newFile),
        { new: true }, (err2) => {
          if (err2) {
            res.status(500).send(err2);
          } else {
            res.send({ msg: 'File has been locked' });
          }
        });
    }
  });
};
