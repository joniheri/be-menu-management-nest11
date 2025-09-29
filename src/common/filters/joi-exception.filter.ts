import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { JoiPipeValidationException } from 'nestjs-joi';
import { formatJoiErrors } from '../utils/joi-error.util';

@Catch(JoiPipeValidationException)
export class JoiExceptionFilter implements ExceptionFilter {
  catch(exception: JoiPipeValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 400;

    const details = (exception as any).cause?.details ?? [];
    const validationErrors = formatJoiErrors(details);

    response.status(status).json({
      message: 'Request body is missing or invalid',
      error: 'Bad Request',
      statusCode: status,
      validation: validationErrors,
    });
  }
}
