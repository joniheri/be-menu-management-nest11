import { ValidationErrorItem } from 'joi';

export function formatJoiErrors(
  details: ValidationErrorItem[],
): Record<string, string> {
  const errors: Record<string, string> = {};

  details.forEach((detail) => {
    const field = detail.path?.[0] ?? 'unknown';
    errors[field] = detail.message;
  });

  return errors;
}
