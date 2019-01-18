import {
    getUsers,
    getUserByUsername,
} from '../controllers/userController';

const userRoutes = (app) => {
    app.route('/v1/users')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getUsers);

    app.route('/v1/users/:username')
    .get(getUserByUsername);
}

export default userRoutes;
