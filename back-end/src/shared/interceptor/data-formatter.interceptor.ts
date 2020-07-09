import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function loopObject(data) {
  const result = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      result[key] = loop(data[key]);
    }
  }
  return result;
}

function loop(data) {
  if (Array.isArray(data)) {
    return data.map(loop);
  }
  if (data && typeof(data) === 'object') {
    return loopObject(delete_id(data));
  }
  return data;
}

function delete_id(data) {
  const { _id, __v, password, forgottenToken, forgottenTokenTime, ...result } = data;
  return result;
}

@Injectable()
export class DataFormatterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(data => data === undefined ? data : loop(JSON.parse(JSON.stringify(data)))),
      );
  }
}