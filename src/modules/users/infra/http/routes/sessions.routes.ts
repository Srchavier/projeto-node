import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controlles/SessionsController';

const sessionsRouter = Router();
const sessionController = new SessionsController();
sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(15),
    },
  }),
  sessionController.authenticateUser,
);

export default sessionsRouter;
