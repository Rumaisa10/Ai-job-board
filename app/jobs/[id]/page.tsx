import { connectDB } from '@/lib/db'
import { Job } from '@/models/Job'
import { User } from '@/models/User'
import { IJob } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import SaveJobButton from '@/components/jobs/SaveJobButton'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getJob(id: string): Promise<IJob | null> {
  try {
    await connectDB()
    const job = await Job.findById(id).lean()
    if (!job) return null
    return JSON.parse(JSON.stringify(job))
  } catch {
    return null
  }
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params
  const job = await getJob(id)

  if (!job) notFound()

  // check if user has saved this job
  const session = await auth()
  let initialSaved = false

  if (session?.user?.email) {
    await connectDB()
    const user = await User.findOne({ email: session.user.email })
    initialSaved = user?.savedJobs?.includes(id) ?? false
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/jobs"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Back to jobs
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {job.type}
          </span>
        </div>

        <p className="text-xl text-gray-600 mb-2">{job.company}</p>
        <p className="text-gray-500 mb-2">{job.location}</p>
        {job.salary && (
          <p className="text-green-600 font-medium mb-6">{job.salary}</p>
        )}

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-3">Job Description</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>

        <h2 className="text-xl font-semibold mb-3">Requirements</h2>
        <ul className="list-disc list-inside space-y-1 mb-8">
          {job.requirements.map((req, index) => (
            <li key={index} className="text-gray-700">{req}</li>
          ))}
        </ul>

        <div className="flex gap-4">
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Apply Now
          </button>
          <SaveJobButton jobId={id} initialSaved={initialSaved} />
        </div>
      </div>
    </div>
  )
}