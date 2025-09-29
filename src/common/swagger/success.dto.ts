import { ApiProperty } from '@nestjs/swagger';

export class SuccessDto {
  @ApiProperty({ example: 'success' }) status: string;
}
