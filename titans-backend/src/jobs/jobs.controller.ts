/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from '../common/dto/request/create-job.dto';
import { JobResponse } from 'src/common/dto/response/job.response';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  /**
   * Create a new job entry
   * @param createJobDto DTO containing job details
   * @returns The created job
   */
  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createJobDto: CreateJobDto): Promise<JobResponse> {
    return this.jobsService.createJob(createJobDto);
  }

  /**
   * Get all jobs
   * @returns An array of jobs
   */
  @Get("/")
  async findAll(): Promise<JobResponse[]> {
    return this.jobsService.findAll();
  }
}
