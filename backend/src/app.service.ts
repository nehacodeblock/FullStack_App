import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  y = 2;
  getHello(): string {
    return 'Hello World!';
  }
}
