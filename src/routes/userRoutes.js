import {
    getUsers,
    getUserByUsername,
} from '../controllers/userController';

const userRoutes = (app) => {
    app.route('/user')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getUsers);

    app.route('/user/:username')
    .get(getUserByUsername);
}

export default userRoutes;
