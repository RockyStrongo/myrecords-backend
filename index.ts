import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './src/router';
import errorHandler from './src/middlewares/errorHandler';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import notFound from './src/middlewares/notFound';
import cors from 'cors';

dotenv.config();

const app: Express = express();

//config needed for deployment to render.com with reverse proxy
app.set('trust proxy', 1)

const port = process.env.PORT;

// Helmet middleware before other middleware and routes to set secured HTTP headers
app.use(helmet());

// Apply rate limiter to all requests (20/min)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
});
app.use(limiter);

app.use(express.urlencoded({ extended: true }));

app.use(express.json({ limit: '50mb' }));

//to do - when in prod, limit domains allowed by cors config
app.use(cors());

app.use(router);
app.use(errorHandler);
app.use(notFound);


app.listen(port, () => {
    console.log(`⚡️ Server is running at http://localhost:${port}`);
});
