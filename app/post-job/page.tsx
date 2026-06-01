import PostJobForm from '@/components/jobs/PostJobForm'

export default function PostJobPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Post a Job
      </h1>
      <p className="text-gray-500 mb-8">
        Fill in the details below to post your job listing.
      </p>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <PostJobForm />
      </div>
    </div>
  )
}