/* eslint-disable prettier/prettier */

export class JobStatusDto {
  jobId: string;
  status: 'Validating' | 'Valid' | 'Invalid';
}
