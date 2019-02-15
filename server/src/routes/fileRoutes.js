// import {
//   isUserAuthenticated,
// } from '../controllers/authenticationController';

import {
  addNewFile,
  getFiles,
  deleteAllFiles,
  getFileById,
  updateFile,
  deleteFile,
  getFileAndVersion,
} from '../controllers/fileController';

const fileRoutes = (app) => {
  // app.use(isUserAuthenticated);
  app.route('/api/v1/files')
    .get(getFiles)
    .post(addNewFile)
    .delete(deleteAllFiles);

  app.route('/api/v1/files/:id')
    .get(getFileById)
    .put(updateFile)
    .delete(deleteFile);

  app.route('/api/v1/files/:id/:version')
    .get(getFileAndVersion);
};

export default fileRoutes;
