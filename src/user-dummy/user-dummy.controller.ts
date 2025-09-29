import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Patch,
} from '@nestjs/common';
import {
  successResponse,
  errorResponse,
  paginatedResponse,
} from 'src/common/helpers/response';
import { validateOrThrow } from 'src/common/helpers/validate-or-throw.util';
import { UserDummyService } from './user-dummy.service';
import { createUserSchema, updateUserSchema } from './user-dummy.schema';
import {
  DocCreateUser,
  DocDeleteUser,
  DocFindAllUser,
  DocGetUsersById,
  DocUpdateUser,
} from 'src/docs/user-dummy/user.doc';

@Controller('user-dummy')
export class UserDummyController {
  constructor(private readonly userDummyService: UserDummyService) {}

  @Get()
  @DocFindAllUser()
  findAll(@Query('page') page = '1', @Query('size') size = '10') {
    try {
      const {
        data,
        currentPage,
        size: perPage,
        totalData,
      } = this.userDummyService.findAll(Number(page), Number(size));
      return paginatedResponse(data, currentPage, perPage, totalData);
    } catch (error) {
      return errorResponse(error.message, 400);
    }
  }

  @Get(':id')
  @DocGetUsersById()
  findOne(@Param('id') id: string) {
    try {
      const user = this.userDummyService.findOne(Number(id));
      return successResponse(user, 'User retrieved successfully');
    } catch (error) {
      return errorResponse(error.message, 404);
    }
  }

  @Post()
  @DocCreateUser()
  create(@Body() userInput: { name: string; email: string }) {
    try {
      validateOrThrow(createUserSchema, userInput);
      const newUser = this.userDummyService.create(userInput);
      return successResponse(newUser, 'User created successfully');
    } catch (error) {
      if (error.message === 'EMAIL_EXISTS') {
        return errorResponse('This email already exists', 400);
      }
      return errorResponse(error.message, 400);
    }
  }

  @Patch(':id')
  @DocUpdateUser()
  update(
    @Param('id') id: string,
    @Body()
    userInput: {
      name?: string;
      email?: string;
    },
  ) {
    try {
      validateOrThrow(updateUserSchema, userInput);
      const updatedUser = this.userDummyService.update(Number(id), userInput);
      return successResponse(updatedUser, 'User updated successfully');
    } catch (error) {
      if (error.message === 'EMAIL_EXISTS') {
        return errorResponse('This email already exists', 400);
      }
      return errorResponse(error.message, 400);
    }
  }

  @Delete(':id')
  @DocDeleteUser()
  delete(@Param('id') id: string) {
    try {
      this.userDummyService.delete(Number(id));
      return successResponse(null, 'User deleted successfully');
    } catch (error) {
      return errorResponse(error.message, 400);
    }
  }
}
