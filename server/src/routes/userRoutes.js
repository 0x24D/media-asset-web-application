import {
  getUsers,
  deleteAllUsers,
  getUserByUsername,
  deleteUser,
} from '../controllers/userController';

const userRoutes = (app) => {
  // TODO: add middleware for checking user authentication on all routes
  app.route('/v1/users')
    .get(getUsers)
    .delete(deleteAllUsers);

  app.route('/v1/users/:username')
    .get(getUserByUsername)
    .delete(deleteUser);
};

export default userRoutes;
