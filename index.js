import express from 'express';
import routes from './src/routes/crmRoutes';

const app = express();
const PORT = 8080;

routes(app);

app.get('/', (req, res) =>
    res.send('Hello World')
);

app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
);
