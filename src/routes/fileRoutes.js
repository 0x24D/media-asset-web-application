import {
    addNewFile,
    getFiles,
    deleteAllFiles,
} from '../controllers/fileController';

const fileRoutes = (app) => {
    // TODO: add middleware for checking user authentication on all routes
    app.route('/v1/files')
    .get(getFiles)
    .post(addNewFile)
    .delete(deleteAllFiles);
}

export default fileRoutes;
