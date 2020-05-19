import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCIds(cIds): string {
    return cIds;
  }
}
