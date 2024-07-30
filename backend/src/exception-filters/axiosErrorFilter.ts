import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';

type Auth0Error = { error: string, error_description: string };

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError<string | Auth0Error>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response  = ctx.getResponse();
    const statusCode = exception.response.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const responseData = exception.response.data;

    let message = 'An unexpected error occurred.';

    if (typeof responseData === 'string') {
      message = responseData;
    } else if (responseData.error_description) {
      message = responseData.error_description;
    }

    response.status(statusCode).json({
      statusCode,
      message
    })
  }
}