import * as dotenv from 'dotenv'
dotenv.config()

import express from "express";
import morgan from "morgan";

//routes
import jobRouter from './routers/jobRouter.js';
import mongoose from "mongoose";
// import { mongoDbString } from "./constants/data.js";
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import { mongoDbString } from './constants/data.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cors())

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//imported routes being used here as middleware
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Api not found' });
});

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5100

try {
  await mongoose.connect(mongoDbString);
  // await mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log("DB server running on port:",PORT);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
