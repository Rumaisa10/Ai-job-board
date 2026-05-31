import { IJob } from '@/types'
import Link from 'next/link'

interface JobCardProps {
  job: IJob
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {job.type}
          </span>
        </div>
        <p className="text-gray-600 mb-2">{job.company}</p>
        <p className="text-gray-500 text-sm mb-3">{job.location}</p>
        {job.salary && (
          <p className="text-green-600 font-medium">{job.salary}</p>
        )}
        <p className="text-gray-600 text-sm mt-3 line-clamp-2">
          {job.description}
        </p>
      </div>
    </Link>
  )
}