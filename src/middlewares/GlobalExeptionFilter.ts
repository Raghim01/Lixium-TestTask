import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ERROR_MESSAGE } from 'src/common/error-messages';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { statusCode, message } = this.parseExeption(exception);

    response.status(statusCode).json({ status: statusCode, message });
  }

  private parseExeption(exception: any) {
    let statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = ERROR_MESSAGE.serverError;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus() ?? HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    return { statusCode, message };
  }
}
