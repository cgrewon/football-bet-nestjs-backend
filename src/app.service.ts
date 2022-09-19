import { Injectable } from '@nestjs/common';
import { ResultWords, Status } from './app.interfaces';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

}
