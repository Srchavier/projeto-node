import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import ensumeAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UsersController from '../controlles/UsersController';
import UserAvatarController from '../controlles/UserAvatarController';

const usersRouter = Router();
const userController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().max(80).min(10),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(15).required(),
    },
  }),
  userController.create,
);

usersRouter.patch(
  '/avatar',
  ensumeAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
