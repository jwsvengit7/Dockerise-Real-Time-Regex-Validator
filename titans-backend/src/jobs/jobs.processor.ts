/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';
import { JobsService } from './jobs.service';
import { JobsGateway } from './jobs.gateway';
import { ConfigService } from '@nestjs/config';
import { JobStatusDto } from '../common/dto/request/job-status.dto';
import { RedisService } from 'src/redis/redis.service';
@Injectable()
export class JobsProcessor implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly jobsService: JobsService,
    private readonly jobsGateway: JobsGateway,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async onModuleInit() {
    await this.kafkaService.consume('regex-jobs', async (message) => {
      try {
        const rawValue = message.message.value?.toString();
        if (!rawValue) return;
  
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const parsed: { jobId: string; input: string } = JSON.parse(rawValue);
  
        const pattern = this.configService.get<string>('REGEX_PATTERN');
        const delay = Number(this.configService.get<number>('PROCESS_DELAY_MS') || 2000);
  
        await new Promise((res) => setTimeout(res, delay));
  
       
if (!pattern) {
  throw new Error('REGEX_PATTERN environment variable is not defined');
}

const isValid = new RegExp(pattern).test(parsed.input);

        const status = isValid ? 'Valid' : 'Invalid';
  
        await this.jobsService.updateStatus(parsed.jobId, status);
        const statusDto : JobStatusDto = { jobId: parsed.jobId, status }
         this.jobsGateway.broadcastStatus(statusDto);
        await this.redisService.publishJobStatus(statusDto);
  
      } catch (error) {
        console.error('Error consuming regex job:', error);
      }
    });
  }
  
}
