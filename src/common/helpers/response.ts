export function successResponse<T>(data: T, message = 'success') {
  return {
    status: 'success',
    message,
    data,
  };
}

export function paginatedResponse<T>(
  data: T[],
  currentPage: number,
  perPage: number,
  totalData: number,
  message = 'success',
) {
  const totalPage = Math.ceil(totalData / perPage);
  return {
    status: 'success',
    message,
    currentPage,
    perPage,
    totalPage,
    totalData,
    data,
  };
}

export function errorResponse(message: string, statusCode = 500) {
  return {
    status: 'error',
    message,
    statusCode,
  };
}

export function validationErrorResponse(
  errors: any,
  message = 'Validation Error',
) {
  return {
    status: 'fail',
    message,
    errors,
  };
}
