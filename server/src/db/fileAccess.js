import mongoose from 'mongoose';
import { FileSchema } from '../models/fileModel';

const File = mongoose.model('file', FileSchema);

export const addNew = (dataToSave, callback) => {
  const newFile = new File({
    name: dataToSave.name,
    data: [{
      title: dataToSave.title,
      author: dataToSave.author,
      tags: dataToSave.tags,
    }],
  });
  newFile.save((err, file) => {
    callback(err, file);
  });
};

export const deleteAll = (callback) => {
  File.deleteMany({}, (err) => {
    callback(err);
  });
};

export const deleteById = (fileId, callback) => {
  File.findByIdAndDelete(fileId, (err) => {
    callback(err);
  });
};

export const findById = (fileId, callback) => {
  File.findById(fileId).lean().exec((err, file) => {
    callback(err, file);
  });
};

export const findAll = ((callback) => {
  File.find({}).lean().exec((err, files) => {
    callback(err, files);
  });
});

export const updateExistingById = (fileId, currentFile, dataToSave, callback) => {
  const updatedFile = currentFile;
  updatedFile.locked = dataToSave.locked;
  updatedFile.data[dataToSave.version - 1] = {
    version: dataToSave.version,
    title: dataToSave.title,
    author: dataToSave.author,
    tags: dataToSave.tags,
  };
  File.findOneAndUpdate({ _id: fileId }, new File(updatedFile),
    { new: true }, (err, file) => {
      callback(err, file);
    });
};
