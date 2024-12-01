import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health() {
    return { status: 'OK', message: 'Application is healthy' };
  }
}
