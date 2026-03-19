import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { solveService } from '../services/solveService.js';

export const solveRouter = Router();

solveRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object({
      problem: Joi.string().required(),
    }),
  }),
  (req, res) => {
    const { problem } = req.body as { problem: string };
    const solution = solveService.solve(problem);
    res.json({ solution });
  }
);
