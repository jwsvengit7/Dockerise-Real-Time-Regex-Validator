/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobsGateway } from './jobs.gateway';
import { JobsProcessor } from './jobs.processor';
import { KafkaService } from '../kafka/kafka.service';
import { Job, JobSchema } from 'src/database/job.schema';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
  controllers: [JobsController],
  providers: [JobsService, JobsGateway, JobsProcessor, KafkaService,RedisService],
})
export class JobsModule {}
