import {
    getUsers,
    getUserByUsername,
} from '../controllers/userController';

const userRoutes = (app) => {
    // TODO: add middleware for checking user authentication on all routes
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
