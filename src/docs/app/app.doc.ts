import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';

export function DocGetHello() {
  return applyDecorators(
    ApiTags('App'),
    ApiOperation({ summary: 'Get hello world text' }),
    ApiOkResponse({ description: 'Returns Hello World!', type: String }),
  );
}
