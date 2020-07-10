import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import authJob from './jobs/auth';
import ordersJob from './jobs/orders';

ordersJob();
authJob();

const app = express();

app.use(express.json());
app.use(cors());

export default app;
