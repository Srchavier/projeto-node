import { Router } from 'express';

import ProfileController from '../controlles/ProfileController';

import ensumeAuthenticated from '../middlewares/ensureAuthenticated';

const ProfileRouter = Router();
const profileController = new ProfileController();

ProfileRouter.use(ensumeAuthenticated);
ProfileRouter.get('/', profileController.show);
ProfileRouter.put('/', profileController.update);

export default ProfileRouter;
