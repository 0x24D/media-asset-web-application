import {
    addNewFile,
    getFiles,
    deleteAllFiles,
    getFileById,
    deleteFile,
    getFileAndVersion,
} from '../controllers/fileController';

const fileRoutes = (app) => {
    // TODO: add middleware for checking user authentication on all routes
    app.route('/v1/files')
    .get(getFiles)
    .post(addNewFile)
    .delete(deleteAllFiles);

    app.route('/v1/files/:id')
    .get(getFileById)
    .delete(deleteFile);

    app.route('/v1/files/:id/:version')
    .get(getFileAndVersion);
}

export default fileRoutes;
