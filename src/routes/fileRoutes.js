import {
    addNewFile,
    getFiles,
    deleteAllFiles,
    getFileById,
    deleteFile
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
}

export default fileRoutes;
