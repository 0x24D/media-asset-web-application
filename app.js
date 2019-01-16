import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/userRoutes';

const app = express();

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mediaAssetDb', {
    useNewUrlParser: true
});
mongoose.set('useCreateIndex', true)
mongoose.connection.on('error', () => {
  console.log(`MongoDB connection error. Please make sure MongoDB is running.`);
  process.exit();
});

// bodyparser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

userRoutes(app);

export default app;
