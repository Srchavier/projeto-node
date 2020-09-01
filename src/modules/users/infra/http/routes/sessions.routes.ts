import { Router } from 'express';
import SessionsController from '../controlles/SessionsController';

const sessionsRouter = Router();
const sessionController = new SessionsController();
sessionsRouter.post('/', sessionController.authenticateUser);

export default sessionsRouter;
