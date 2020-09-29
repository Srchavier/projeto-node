import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProfileController from '../controlles/ProfileController';

import ensumeAuthenticated from '../middlewares/ensureAuthenticated';

const ProfileRouter = Router();
const profileController = new ProfileController();

ProfileRouter.use(ensumeAuthenticated);
ProfileRouter.get('/', profileController.show);
ProfileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string().min(6).max(15),
      password: Joi.string().min(6).max(15),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default ProfileRouter;
