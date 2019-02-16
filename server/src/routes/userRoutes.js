import {
  isUserAuthenticated,
} from '../controllers/authenticationController';

import {
  getUsers,
  addNewUser,
  deleteAllUsers,
  getUserByUsername,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const userRoutes = (app) => {
  app.use(isUserAuthenticated);
  app.route('/api/v1/users')
    .get(getUsers)
    .post(addNewUser)
    .delete(deleteAllUsers);

  app.route('/api/v1/users/:username')
    .get(getUserByUsername)
    .put(updateUser)
    .delete(deleteUser);
};

export default userRoutes;
