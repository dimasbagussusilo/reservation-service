import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import {
  CallHandler,
  NestInterceptor,
} from '@nestjs/common/interfaces/features/nest-interceptor.interface';
import { Request, Response } from 'express';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

export interface IDefaultRes<T> {
  data: T;
  meta: IDefaultMeta;
}

export interface IDefaultMeta {
  page?: number;
  limit?: number;
  total_row?: number;
  total_page?: number;
  status: boolean;
  status_code: number;
  timestamp: string;
  self_url: string;

  [key: string]: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IDefaultRes<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IDefaultRes<T>> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const timestamp = new Date().toISOString();

    return next.handle().pipe(
      map((data) => {
        if (!data) throw new NotFoundException('Data Not Found');
        const status = true;
        let result: IDefaultRes<T> = {
          data,
          meta: {
            status: status,
            status_code: response.statusCode,
            self_url: request.url,
            timestamp,
          },
        };

        if (data.rows) {
          const { page, limit, total_row, total_page } = data;

          result = {
            data: data.rows,
            meta: {
              ...result.meta,
              page: +page,
              total_page,
              limit: +limit,
              total_row: +total_row || 0,
            },
          };
        }

        return result;
      }),
    );
  }
}
