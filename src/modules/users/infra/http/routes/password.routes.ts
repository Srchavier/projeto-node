import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ForgotPasswordController from '../controlles/ForgotPasswordController';
import ResetPasswordControler from '../controlles/ResetPasswordControler';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordControler = new ResetPasswordControler();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required().min(6).max(15),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordControler.create,
);

export default passwordRouter;
