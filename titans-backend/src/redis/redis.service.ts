/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
// import { JobStatusDto } from '../jobs/dto/job-status.dto';

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor() {
    // Assuming Redis is running locally; adapt as needed for production
    this.redisClient = new Redis({
      host: 'localhost', // Redis server host
      port: 6379,        // Redis server port
    });
  }

  // Publish job status to a Redis channel
  async publishJobStatus(statusDto: any): Promise<void> {
    const channel = 'job-status-channel';  // Redis channel for job status updates
    await this.redisClient.publish(channel, JSON.stringify(statusDto));
  }

  // Optionally, you could add methods for subscribing to the channel if needed
}
