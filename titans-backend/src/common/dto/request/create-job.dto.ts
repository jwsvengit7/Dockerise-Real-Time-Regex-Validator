/* eslint-disable prettier/prettier */


import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  input: string;
}
