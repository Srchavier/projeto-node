import { Router } from 'express';
import ForgotPasswordController from '../controlles/ForgotPasswordController';
import ResetPasswordControler from '../controlles/ResetPasswordControler';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordControler = new ResetPasswordControler();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordControler.create);

export default passwordRouter;
