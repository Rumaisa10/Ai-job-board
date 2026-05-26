import mongoose, { Document, Schema } from 'mongoose'
import { IJob } from '@/types'

export interface IJobDocument extends Omit<IJob, '_id'>, Document {}

const JobSchema = new Schema<IJobDocument>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'remote'],
    required: true
  },
  salary: { type: String },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  postedBy: { type: String, required: true },  // ← must be String not ObjectId
  createdAt: { type: Date, default: Date.now }
})

export const Job = mongoose.models.Job ||
  mongoose.model<IJobDocument>('Job', JobSchema)