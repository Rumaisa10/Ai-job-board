import mongoose, { Document, Schema } from 'mongoose'
import { IUser } from '@/types'

export interface IUserDocument extends Omit<IUser, '_id'>, Document {}

const UserSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  role: {
    type: String,
    enum: ['employer', 'jobseeker'],
    default: 'jobseeker'
  },
  savedJobs: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
})

export const User = mongoose.models.User ||
  mongoose.model<IUserDocument>('User', UserSchema)