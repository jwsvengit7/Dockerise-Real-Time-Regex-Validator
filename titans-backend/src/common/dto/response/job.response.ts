/* eslint-disable prettier/prettier */

import { Job } from "src/database/job.schema";

export class JobResponse {
    success: boolean;
    message:string;
    data:Job;
  }
  