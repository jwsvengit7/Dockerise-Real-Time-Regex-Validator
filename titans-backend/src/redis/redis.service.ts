/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
// import { JobStatusDto } from '../jobs/dto/job-status.dto';

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor(private readonly configService: ConfigService) {
    this.redisClient = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: 6379,       
    });
}



  async publishJobStatus(statusDto: any): Promise<void> {
    const channel = 'job-status-channel';
    await this.redisClient.publish(channel, JSON.stringify(statusDto));
  }

}
