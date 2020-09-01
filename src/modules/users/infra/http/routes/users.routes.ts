import { Router } from 'express';
import multer from 'multer';

import ensumeAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UsersController from '../controlles/UsersController';
import UserAvatarController from '../controlles/UserAvatarController';

const usersRouter = Router();
const userController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', userController.create);

usersRouter.patch(
  '/avatar',
  ensumeAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
