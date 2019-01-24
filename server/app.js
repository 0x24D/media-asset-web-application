import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileRoutes from './src/routes/fileRoutes';
import userRoutes from './src/routes/userRoutes';

const app = express();

const config = require('./_config');

// mongoose connection
mongoose.Promise = global.Promise;
console.log(`Connecting to DB: ${config.mongoURI[process.env.NODE_ENV]}`);
mongoose.connect(config.mongoURI[process.env.NODE_ENV], {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

fileRoutes(app);
userRoutes(app);

export default app;
