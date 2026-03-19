import express from 'express';
import { solveRouter } from './routes/solveRouter.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.use('/solve', solveRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'Hello AI-world' });
});

app.use(errorHandler);
