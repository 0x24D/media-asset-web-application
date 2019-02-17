import {
  addNew,
  deleteAll,
  deleteById,
  findAll,
  findById,
  updateExistingById,
} from '../db/fileAccess';

export const getFiles = (req, res) => {
  findAll((err, files) => {
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
  const dataToSave = {
    name: req.body.name,
    title: req.body.title,
    author: req.body.author,
    tags: req.body.tags,
  };
  addNew(dataToSave, (err, file) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(file);
    }
  });
};

export const deleteAllFiles = (req, res) => {
  deleteAll((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).end();
    }
  });
};

export const getFileById = (req, res) => {
  findById(req.params.id, (err, file) => {
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
  const fileId = req.params.id;
  findById(fileId, (err, currentFile) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const updateData = {
        locked: false,
        version: currentFile.data.length + 1,
        title: req.body.title,
        author: req.body.author,
        tags: req.body.tags,
      };
      updateExistingById(fileId, currentFile, updateData, (err2, updatedFile) => {
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
  deleteById(req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).end();
    }
  });
};

export const getFileAndVersion = (req, res) => {
  findById(req.params.id, (err, file) => {
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
  const fileId = req.params.id;
  findById(fileId, (err, currentFile) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const newFile = currentFile;
      newFile.locked = true;
      updateExistingById(fileId, newFile, (err2) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          res.send({ msg: 'File has been locked' });
        }
      });
    }
  });
};
