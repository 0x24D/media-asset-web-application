import {
    addNewFile,
    getFiles,
    deleteAllFiles,
} from '../controllers/fileController';

const fileRoutes = (app) => {
    app.route('/file')
    .get(getFiles)
    .post(addNewFile)
    .delete(deleteAllFiles);
}

export default fileRoutes;
