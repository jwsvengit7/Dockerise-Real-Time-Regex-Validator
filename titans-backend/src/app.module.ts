/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { JobsModule } from './jobs/jobs.module';
import { KafkaModule } from './kafka/kafka.module';
import { JobsGateway } from './jobs/jobs.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    DatabaseModule,
    KafkaModule,
    JobsModule,
  ],
  providers: [JobsGateway], 
})
export class AppModule {}
