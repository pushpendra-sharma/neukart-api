import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectToDB, logger } from './utils';
import { router } from './routes';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use('/', router);

const port = process.env.PORT || 4000;
app.listen(port, async () => {
  logger.info(`App running on port ${port}...`);
  await connectToDB();
});
