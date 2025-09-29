import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiQuery,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import {
  UserCreatedResponseDto,
  UserDeletedResponseDto,
  UserGetByIdResponseDto,
  UserGetPaginatedResponseDto,
  UserUpdatedResponseDto,
} from './user-respoonse.dto';

export function DocFindAllUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Get users with pagination' }),
    ApiQuery({ name: 'page', required: false, type: Number, example: 1 }),
    ApiQuery({ name: 'size', required: false, type: Number, example: 10 }),
    ApiOkResponse({
      description: 'Returns paginated users',
      type: UserGetPaginatedResponseDto,
    }),
  );
}

export function DocGetUsersById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get User by ID' }),
    ApiParam({ name: 'id', required: true, type: String, example: 1 }),
    ApiOkResponse({
      description: 'Returns users by ID',
      type: UserGetByIdResponseDto,
    }),
  );
}

export function DocCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Create new user' }),
    ApiBody({
      schema: {
        example: {
          email: 'newuser@example.com',
          name: 'newuser',
        },
      },
    }),
    ApiOkResponse({
      description: 'Returns created user',
      type: UserCreatedResponseDto,
    }),
  );
}

export function DocUpdateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Update user by ID' }),
    ApiBody({
      schema: {
        example: {
          email: 'updateduser@example.com',
          name: 'updateduser',
        },
      },
    }),
    ApiOkResponse({
      description: 'Returns updated user',
      type: UserUpdatedResponseDto,
    }),
  );
}

export function DocDeleteUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete user by ID' }),
    ApiParam({ name: 'id', required: true, type: String, example: 1 }),
    ApiOkResponse({
      description: 'Returns deleted user info',
      type: UserDeletedResponseDto,
    }),
  );
}
