import {
  ArgumentsHost,
  Catch,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Logger,
  ExceptionFilter as NestExceptionFilter,
} from '@nestjs/common';
import { ENV } from '@src/env';
import { QueryFailedError } from 'typeorm';

interface IErrorDetails {
  message: string;
  stack?: string;
  name: string;
  url?: string;
  method?: string;
  timestamp: string;
}

interface IErrorResponse {
  statusCode: number;
  errorMessages: string[];
}

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  private readonly logger = new Logger(ExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const errorDetails = this.buildErrorDetails(exception, request);
    this.logException(exception, errorDetails, request);

    const { statusCode, errorMessages } = this.processException(exception);

    const finalResponse = {
      success: false,
      statusCode,
      errorMessages: this.handleErrorMessage(errorMessages, exception),
    };

    response.status(statusCode).json(finalResponse);
  }

  private buildErrorDetails(exception: any, request: any): IErrorDetails {
    return {
      message: exception?.message || 'Unknown error',
      stack: exception?.stack,
      name: exception?.name || exception?.constructor?.name,
      url: request?.url,
      method: request?.method,
      timestamp: new Date().toISOString(),
    };
  }

  private logException(exception: any, errorDetails: IErrorDetails, request: any): void {
    if (exception instanceof HttpException) {
      this.logger.warn(
        `HTTP Exception [${exception.getStatus()}]: ${exception.message} | URL: ${request?.url} | Method: ${request?.method}`
      );
      return;
    }

    // Handle DB errors more gracefully so logs are prettier and useful
    if (exception instanceof QueryFailedError) {
      // Try to extract minimal, useful info from driverError
      const driverError: any = (exception as any).driverError || {};
      const code = driverError.code || '';
      const detail = driverError.detail || driverError.message || exception.message;

      // If this is a not-null violation prefer the column name for concise logs
      let conciseDetail = detail;
      if (code === '23502' || /null value in column/.test(String(exception.message))) {
        const column =
          driverError.column ||
          (() => {
            const m = String(exception.message).match(/null value in column "([^"]+)"/);
            return m ? m[1] : null;
          })();

        if (column) {
          conciseDetail = `${column} is required`;
        }
      }

      // Log concise DB error at error level
      this.logger.error(
        `Database Error [code=${code}]: ${conciseDetail} | URL: ${request?.url} | Method: ${request?.method}`
      );

      // Also log stack at debug level so production logs stay clean
      if (errorDetails.stack) {
        this.logger.warn(`Stack available (hidden in error): ${errorDetails.stack}`);
      }

      return;
    }

    // Fallback for other unhandled exceptions
    this.logger.error(
      `Unhandled Exception: ${errorDetails.message} | Type: ${errorDetails.name} | URL: ${errorDetails.url} | Method: ${errorDetails.method}`,
      errorDetails.stack
    );
  }

  private processException(exception: any): IErrorResponse {
    if (exception instanceof TypeError) {
      return this.handleTypeError(exception);
    } else if (exception instanceof HttpException) {
      return this.handleHttpException(exception);
    } else {
      return this.handleDatabaseAndOtherErrors(exception);
    }
  }

  private handleTypeError(exception: TypeError): IErrorResponse {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessages: string[];

    if (exception.message) {
      errorMessages = [exception.message];
    } else {
      errorMessages = ['Internal Server Error'];
    }

    return { statusCode, errorMessages };
  }

  private handleHttpException(exception: HttpException): IErrorResponse {
    const statusCode = exception.getStatus();
    const res: any = exception.getResponse();
    let errorMessages: string[];

    if (exception instanceof ForbiddenException) {
      errorMessages = ['Unauthorized request'];
    } else {
      errorMessages = typeof res.message === 'string' ? [res.message] : res.message;
    }

    return { statusCode, errorMessages };
  }

  private handleDatabaseAndOtherErrors(exception: any): IErrorResponse {
    let statusCode: number;
    let errorMessages: string[] = [exception.message];

    // Prefer driverError codes when available (Postgres)
    const driverError: any = exception?.driverError || {};
    const code = driverError.code || '';

    // Unique violation (Postgres 23505)
    if (
      exception?.message &&
      (exception.message.includes('duplicate key value violates unique constraint') ||
        code === '23505')
    ) {
      try {
        const detail = exception.detail || driverError.detail || '';
        const match = detail.match(/Key \(([^)]+)\)=/);
        const field = match ? match[1] : 'field';
        errorMessages = [`${field} already exists`];
      } catch (_err) {
        errorMessages = ['Duplicate value already exists'];
      }
      statusCode = HttpStatus.CONFLICT;
    }
    // Not-null violation (Postgres 23502)
    else if (
      exception?.message &&
      (exception.message.includes('null value in column') || code === '23502')
    ) {
      try {
        // Try driver-provided column, otherwise parse message
        const column =
          driverError.column ||
          (() => {
            const m = exception.message.match(/null value in column "([^"]+)"/);
            return m ? m[1] : 'field';
          })();

        errorMessages = [`${column} is required`];
      } catch (_err) {
        errorMessages = ['Required field is missing'];
      }
      statusCode = HttpStatus.BAD_REQUEST;
    } else {
      errorMessages = errorMessages ? errorMessages : ['Internal Server Error'];
      statusCode = statusCode ? statusCode : HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return { statusCode, errorMessages };
  }

  private handleErrorMessage(messages: any[], exception: any): string[] | string {
    if (Array.isArray(messages) && messages?.length && ENV.config.isDevelopment) {
      return [...(exception.response?.detail ? [exception.response?.detail] : []), messages[0]];
    } else if (Array.isArray(messages) && messages?.length) {
      return [messages[0]];
    } else {
      return 'something went wrong';
    }
  }
}
