/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.createJob(createJobDto);
  }

  @Get()
  async findAll() {
    return this.jobsService.findAll();
  }
}
