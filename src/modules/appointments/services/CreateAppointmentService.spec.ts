import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '1646161',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1646161');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const date = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date,
      provider_id: '1646161',
    });

    expect(
      createAppointmentService.execute({
        date,
        provider_id: '1646161',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
