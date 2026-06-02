import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      {/* Hero */}
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Find Your Dream Job with{' '}
        <span className="text-blue-600">AI Assistance</span>
      </h1>
      <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
        Browse hundreds of jobs, save your favourites, and use AI to write
        cover letters and score your CV against job descriptions.
      </p>

      <div className="flex gap-4 justify-center mb-16">
        <Link
          href="/jobs"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Browse Jobs
        </Link>
        <Link
          href="/post-job"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition-colors"
        >
          Post a Job
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl mb-3">🔍</div>
          <h3 className="text-lg font-semibold mb-2">Browse Jobs</h3>
          <p className="text-gray-500 text-sm">
            Find the latest job listings from top companies across the UK.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl mb-3">✨</div>
          <h3 className="text-lg font-semibold mb-2">AI Cover Letter</h3>
          <p className="text-gray-500 text-sm">
            Generate a personalised cover letter in seconds using AI.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-lg font-semibold mb-2">CV Scorer</h3>
          <p className="text-gray-500 text-sm">
            Score your CV against any job description and get actionable feedback.
          </p>
        </div>
      </div>
    </div>
  )
}