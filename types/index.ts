export interface IUser {
    _id : string
    name :string
    email: string
  image?: string
  role: 'employer' | 'jobseeker'
  savedJobs: string[]
  createdAt: Date
}

export interface IJob { 
    _id: string
  title: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'remote'
  salary?: string
  description: string
  requirements: string[]
  postedBy: string
  createdAt: Date
}

export interface CreateJobDto {
  title: string
  company: string
  location: string
  type: IJob['type']
  salary?: string
  description: string
  requirements: string[]
}

export type UpdateJobDto = Partial<CreateJobDto>