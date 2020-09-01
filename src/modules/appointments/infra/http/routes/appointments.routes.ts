import { Router } from 'express';
import ensumeAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controlles/AppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(ensumeAuthenticated);

const appointmentsController = new AppointmentsController();

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
