import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: joi.ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value, { abortEarly: false });
    if (error) {
      throw new BadRequestException(
        error.details.map((err) => err.message).join(', '),
      );
    }
    return value;
  }
}
