import { envConstants } from '@app/config/constants';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';

import { Book } from '../book.entity';

export const ApiSearchByTitleOkResponse = ApiOkResponse({
  description:
    envConstants.BookModule.SwaggerDocumentation
      .API_OK_RESPONSE_DESCRIPTION,
  type: [Book],
});

export const ApiItemPerPageQuery = ApiQuery({
  name: envConstants.BookModule.SwaggerDocumentation
    .ITEM_PER_PAGE_QUERY_NAME,
  required: true,
  description:
    envConstants.BookModule.SwaggerDocumentation
      .ITEM_PER_PAGE_QUERY_DESCRIPTION,
  type: Number,
});

export const ApiPageQuery = ApiQuery({
  name: envConstants.BookModule.SwaggerDocumentation.PAGE_QUERY_NAME,
  required: true,
  description:
    envConstants.BookModule.SwaggerDocumentation.PAGE_QUERY_DESCRIPTION,
  type: Number,
});

export const ApiKeywordQuery = ApiQuery({
  name: envConstants.BookModule.SwaggerDocumentation.KEYWORD_QUERY_NAME,
  required: true,
  allowEmptyValue: true,
  description:
    envConstants.BookModule.SwaggerDocumentation.PAGE_QUERY_DESCRIPTION,
  type: String,
});
