import { IJob } from '@/types'
import JobCard from '@/components/jobs/JobCard'
import { connectDB } from '@/lib/db'
import { Job } from '@/models/Job'

export const dynamic = 'force-dynamic'

async function getJobs(): Promise<IJob[]> {
  await connectDB()
  const jobs = await Job.find().sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(jobs))
}

export default async function JobsPage() {
  const jobs = await getJobs()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Find Your Next Job
      </h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No jobs posted yet. Be the first to post one!
        </p>
      ) : (
        <div className="grid gap-4">
          {jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}