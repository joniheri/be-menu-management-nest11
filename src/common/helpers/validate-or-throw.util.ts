import Joi from 'joi';
import { ManualValidationException } from '../exceptions/validation.exception';

export function validateOrThrow(schema: Joi.ObjectSchema, payload: any): void {
  const { error } = schema.validate(payload, { abortEarly: false });

  if (!payload || error) {
    const validationErrors: Record<string, string> = {};
    error?.details?.forEach((detail) => {
      const field = detail.path?.[0] ?? 'unknown';
      validationErrors[field] = detail.message;
    });

    throw new ManualValidationException(validationErrors);
  }
}
