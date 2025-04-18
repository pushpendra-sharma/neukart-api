import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectToDB, logger } from './utils';
import { router } from './routes';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// Main router
app.use('/', router);

const port = process.env.PORT || 4000;
app.listen(port, async () => {
  logger.info(`🚀 App running on ${port}...`);

  try {
    await connectToDB();
  } catch (err) {
    process.exit(1); // Exit on DB failure
  }
});
