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
  size: number,
  totalData: number,
  message = 'success',
) {
  const totalPage = Math.ceil(totalData / size);
  return {
    status: 'success',
    message,
    currentPage,
    size,
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
