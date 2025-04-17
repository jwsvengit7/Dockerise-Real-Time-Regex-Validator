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
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),KafkaModule],
  controllers: [JobsController],
  providers: [JobsService, JobsGateway, JobsProcessor, KafkaService,RedisService],
})
export class JobsModule {}
