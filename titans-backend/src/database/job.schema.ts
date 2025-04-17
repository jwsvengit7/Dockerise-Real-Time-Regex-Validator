/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  input: string;

  @Prop({ default: 'Validating' })
  status: 'Validating' | 'Valid' | 'Invalid';

  @Prop()
  regexUsed: string;
  @Prop()
  createdAt:Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
