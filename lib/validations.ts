import { z } from 'zod'

export const jobSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  company: z.string().min(2, 'Company name required'),
  location: z.string().min(2, 'Location required'),
  type: z.enum(['full-time', 'part-time', 'contract', 'remote']),
  salary: z.string().optional(),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  requirements: z.string().min(2, 'At least one requirement needed')
})

export type JobFormData = z.infer<typeof jobSchema>