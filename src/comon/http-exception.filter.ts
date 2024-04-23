import { envConstants } from '@app/config/constants';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import {
  Catch,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let errorMessage;

    switch (status) {
      case HttpStatus.BAD_REQUEST: {
        errorMessage = envConstants.ErrorMessage.BAD_REQUEST;
        break;
      }

      case HttpStatus.UNAUTHORIZED: {
        errorMessage = envConstants.ErrorMessage.UNAUTHORIZED;
        break;
      }

      case HttpStatus.FORBIDDEN: {
        errorMessage = envConstants.ErrorMessage.FORBIDDEN;
        break;
      }

      case HttpStatus.NOT_FOUND: {
        errorMessage = envConstants.ErrorMessage.NOT_FOUND;
        break;
      }

      case HttpStatus.CONFLICT: {
        errorMessage = envConstants.ErrorMessage.CONFLICT;
        break;
      }

      default: {
        errorMessage = envConstants.ErrorMessage.INTERNAL_SERVER_ERROR;
        break;
      }
    }

    exception.message = errorMessage;

    if (
      this.configService.get(envConstants.NODE_ENV) ===
      envConstants.PRODUCTION
    ) {
      return response.status(status).json({
        statusCode: status,
        message: errorMessage,
      });
    }

    return response.status(status).json({
      statusCode: status,
      message: errorMessage,
      stack: exception.stack,
    });
  }
}
