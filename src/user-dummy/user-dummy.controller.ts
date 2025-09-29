import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UsePipes,
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

@Controller('user-dummy')
export class UserDummyController {
  constructor(private readonly userDummyService: UserDummyService) {}

  @Get()
  findAll(@Query('page') page = '1', @Query('size') size = '10') {
    try {
      const {
        data,
        currentPage,
        size: pageSize,
        totalData,
      } = this.userDummyService.findAll(Number(page), Number(size));
      return paginatedResponse(data, currentPage, pageSize, totalData);
    } catch (error) {
      return errorResponse(error.message, 400);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const user = this.userDummyService.findOne(Number(id));
      if (!user) {
        return errorResponse(`User with ID ${id} not found`, 404);
      }
      return successResponse(user, 'User retrieved successfully');
    } catch (error) {
      return errorResponse(error.message, 400);
    }
  }

  @Post()
  create(@Body() userInput: { name: string; email: string }) {
    try {
      validateOrThrow(createUserSchema, userInput);

      const userByEmail = this.userDummyService.findByEmail(userInput.email);
      if (userByEmail) {
        return errorResponse(`Email already ${userInput.email} exists`, 400);
      }

      const newUser = this.userDummyService.create(userInput);
      if (!newUser) {
        return errorResponse('Failed to create user', 400);
      }

      return successResponse(newUser, 'User created successfully');
    } catch (error) {
      return errorResponse(error.message, 400);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    userInput: {
      name?: string;
      email: string;
    },
  ) {
    try {
      validateOrThrow(updateUserSchema, userInput);

      const userById = this.userDummyService.findOne(Number(id));
      if (!userById) {
        return errorResponse(`User with ID ${id} not found`, 404);
      }

      const userByEmail = this.userDummyService.findByEmail(userInput.email);
      if (userByEmail) {
        return errorResponse(`Email already ${userInput.email} exists`, 400);
      }

      const updatedUser = this.userDummyService.update(Number(id), userInput);
      return successResponse(updatedUser, 'User updated successfully');
    } catch (error) {
      return errorResponse(error.message, 400);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    try {
      if (!this.userDummyService.findOne(id)) {
        return errorResponse(`User with ID ${id} not found`, 404);
      }
      return successResponse(null, 'User deleted successfully');
    } catch (error) {
      return errorResponse(error.message, 400);
    }
  }
}
