import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const providerId = request.user.id;
    const { day, month, year } = request.query;

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointmentsService.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      providerId,
    });

    return response.json(classToClass(appointments));
  }
}
