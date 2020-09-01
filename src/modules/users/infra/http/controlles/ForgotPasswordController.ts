import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgodPasswordEmaiService from '@modules/users/services/SendForgodPasswordEmaiService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const authenticateUser = container.resolve(SendForgodPasswordEmaiService);

    await authenticateUser.execute({ email });

    return response.status(204).json();
  }
}
