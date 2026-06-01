import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          AI Job Board
        </Link>
        <div className="flex gap-4">
          <Link
            href="/jobs"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Browse Jobs
          </Link>
          <Link
            href="/post-job"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </nav>
  )
}