import { connectDB } from '@/lib/db'
import { Job } from '@/models/Job'
import { User } from '@/models/User'
import { IJob } from '@/types'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import JobCard from '@/components/jobs/JobCard'

export const dynamic = 'force-dynamic'

export default async function SavedJobsPage() {
  const session = await auth()

  // not logged in → redirect to login
  if (!session?.user?.email) {
    redirect('/api/auth/signin')
  }

  await connectDB()

  const user = await User.findOne({ email: session.user.email })

  if (!user || user.savedJobs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Saved Jobs
        </h1>
        <p className="text-gray-500 text-center py-12">
          You haven't saved any jobs yet. Browse jobs and save ones you like!
        </p>
      </div>
    )
  }

  // fetch all saved jobs
  const jobs: IJob[] = await Job.find({
    _id: { $in: user.savedJobs }
  }).lean().then(jobs => JSON.parse(JSON.stringify(jobs)))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Saved Jobs ({jobs.length})
      </h1>

      <div className="grid gap-4">
        {jobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  )
}