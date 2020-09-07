import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import UsersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/password', passwordRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', UsersRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/profile', profileRoutes);

export default routes;
