import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendEmailForgotPassword from '@modules/users/services/SendEmailForgotPassword';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendEmailForgotPassword = container.resolve(SendEmailForgotPassword);

    await sendEmailForgotPassword.execute({
      email,
    });

    return response.status(204).send();
  }
}
