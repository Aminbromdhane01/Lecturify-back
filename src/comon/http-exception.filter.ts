import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const errorResponse = exception.getResponse();
        const errorMessage = typeof errorResponse === 'string' ? errorResponse : errorResponse['message'] || 'Internal Server Error';

        // Check if the exception contains validation errors
        const validationErrors = exception.getResponse()['message'];

        if (validationErrors) {
            // If validation errors exist, return them in the response
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.path,
                errors: validationErrors
            });
        } else {
            // If no validation errors, return the generic error message
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.path,
                message: errorMessage
            });
        }
    }
} 