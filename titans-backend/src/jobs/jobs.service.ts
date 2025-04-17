/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import { Job, JobDocument } from 'src/database/job.schema';
import { KafkaService } from 'src/kafka/kafka.service';


@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    private kafkaService: KafkaService,
  ) {}

  async createJob(dto: CreateJobDto): Promise<Job> {
    const job = new this.jobModel({
      input: dto.input,
      status: 'Validating',
      createdAt: new Date(),
    });
    await job.save();

    // Send to Kafka
    await this.kafkaService.produce('regex-jobs', {
      jobId: job._id,
      input: job.input,
    });

    return job;
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateStatus(jobId: string, status: string): Promise<void> {
    await this.jobModel.updateOne({ _id: jobId }, { status }).exec();
  }
}
