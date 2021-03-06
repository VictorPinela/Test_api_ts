import express from 'express';
import { router } from './src/router/router';

const app = express();

const port = 9000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(port, () => console.log(`API iniciada em http://localhost:${port}`));
