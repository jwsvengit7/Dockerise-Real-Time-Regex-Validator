/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from '../common/dto/request/create-job.dto';
import { Job, JobDocument } from 'src/database/job.schema';
import { KafkaService } from 'src/kafka/kafka.service';
import { JobResponse } from 'src/common/dto/response/job.response';
import { Utils } from 'src/common/utils/utils';


@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    private kafkaService: KafkaService,
  ) {}

  async createJob(dto: CreateJobDto): Promise<JobResponse> {
    const regexPattern = process.env.REGEX_PATTERN;
    const job = new this.jobModel({
      input: dto.input,
      regexPattern, 
      status: 'Validating',
      createdAt: new Date(),
    });
    await job.save();

    /*
     Publish to Kafka ==================> 
     */
    await this.kafkaService.produce('regex-jobs', {
      jobId: job._id,
      status: job.status,
      createdAt: job.createdAt,
      _id: job._id,
      input: job.input,

      
    });
    
    return Utils.publicResponse(job);
  }

  async findAll(): Promise<JobResponse[]> {
    const job =  await this.jobModel.find().sort({ createdAt: -1 }).exec();
    return  Utils.publicResponse(job);

  }

  async updateStatus(jobId: string, status: string): Promise<void> {
    await this.jobModel.updateOne({ _id: jobId }, { status }).exec();
  }
}
