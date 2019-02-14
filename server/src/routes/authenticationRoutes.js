import {
  loginUser,
  logoutUser,
} from '../controllers/authenticationController';

const authenticationRoutes = (app) => {
  // TODO: add middleware for checking user authentication on logout route
  app.route('/api/v1/authentication/login')
    .post(loginUser);
  app.route('/api/v1/authentication/logout')
    .post(logoutUser);
};

export default authenticationRoutes;
