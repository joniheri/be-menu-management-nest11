import { ApiProperty } from '@nestjs/swagger';
import { SuccessDto } from 'src/common/swagger/success.dto';

export class UserDto {
  @ApiProperty() id: number;
  @ApiProperty() email: string;
  @ApiProperty() name: string;
}

export class UserGetAllResponseDto extends SuccessDto {
  @ApiProperty({ example: 'Users retrieved successfully' }) message: string;
  @ApiProperty({ type: UserDto, isArray: true }) data: UserDto[];
}

export class UserGetPaginatedResponseDto extends SuccessDto {
  @ApiProperty({ example: 'Users retrieved with pagination successfully' })
  message: string;

  @ApiProperty({ example: 1 }) currentPage: number;
  @ApiProperty({ example: 10 }) perPage: number;
  @ApiProperty({ example: 50 }) totalItems: number;
  @ApiProperty({ example: 5 }) totalPages: number;
  @ApiProperty({ type: UserDto, isArray: true }) data: UserDto[];
}

export class UserGetByIdResponseDto extends SuccessDto {
  @ApiProperty({ example: 'Users retrieved by ID successfully' })
  message: string;

  @ApiProperty({ type: UserDto }) data: UserDto;
}

export class UserCreatedResponseDto extends SuccessDto {
  @ApiProperty({ example: 'User created successfully' }) message: string;
  @ApiProperty({ type: UserDto, isArray: true }) data: UserDto[];
}

export class UserUpdatedResponseDto extends SuccessDto {
  @ApiProperty({ example: 'User updated successfully' }) message: string;
  @ApiProperty({ type: UserDto, isArray: false }) data: UserDto[];
}

export class UserDeletedResponseDto extends SuccessDto {
  @ApiProperty({ example: 'User deleted successfully' }) message: string;
}
