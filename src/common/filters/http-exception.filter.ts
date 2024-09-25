import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

interface exceptionResponse {
  error: string;
  statusCode: number;
  message: string[]
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let exceptionMessage;
    let errorData = exception as any;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorData = exception.getResponse() as exceptionResponse;
      exceptionMessage = Array.isArray(errorData.message) ? errorData.message[0] : exception.message;
    } else {
      exceptionMessage = errorData['message'];
    }

    response.status(status).json({
      statusCode: status,
      message: exceptionMessage,
      // timestamp: new Date().toISOString()
      // error: errorData["errors"] ? errorData["errors"] : [],
    });
  }
}
