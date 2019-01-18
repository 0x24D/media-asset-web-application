import {
    addNewFile,
    getFiles,
} from '../controllers/fileController';

const fileRoutes = (app) => {
    app.route('/file')
    .get(getFiles)
    .post(addNewFile);
}

export default fileRoutes;
