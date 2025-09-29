import { BadRequestException } from '@nestjs/common';

export class ManualValidationException extends BadRequestException {
  constructor(validation: Record<string, string>) {
    super({
      message: 'Request body is missing or invalid',
      error: 'Bad Request',
      statusCode: 400,
      validation,
    });
  }
}
