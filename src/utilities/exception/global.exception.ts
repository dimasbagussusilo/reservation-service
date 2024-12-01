import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const timestamp = new Date().toISOString();
    Logger.error(exception, 'ExceptionFilter');
    console.error('ExceptionFilter', exception);

    const defaultMeta = {
      status: false,
      timestamp,
      self_url: request.url,
    };

    if (exception instanceof HttpException) {
      const status = exception.getStatus() || 500;
      let result = {};
      if (exception.getResponse() instanceof Object) {
        result = exception.getResponse();
      } else {
        result = { message: exception.getResponse() };
      }
      response.status(status).json({
        ...defaultMeta,
        statusCode: status,
        ...result,
      });
      return;
    }
    if (exception instanceof Object && exception['error']) {
      const result: Record<string, any> = exception['error'];
      const status = result?.statusCode || 500;
      response.status(status).json({
        ...defaultMeta,
        statusCode: status,
        ...result,
      });
      return;
    }

    response.status(500).json({
      ...defaultMeta,
      statusCode: 500,
      message: exception['message'],
    });
  }
}
