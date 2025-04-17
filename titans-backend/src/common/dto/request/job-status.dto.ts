/* eslint-disable prettier/prettier */

export class JobStatusDto {
  jobId: string;
  status: 'Validating' | 'Valid' | 'Invalid';
   input: string;
  createdAt: string;
  _id: string
}
