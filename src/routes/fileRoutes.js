import {
    addNewFile,
    getFiles,
    deleteAllFiles,
} from '../controllers/fileController';

const fileRoutes = (app) => {
    app.route('/v1/files')
    .get(getFiles)
    .post(addNewFile)
    .delete(deleteAllFiles);
}

export default fileRoutes;
