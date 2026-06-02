import CoverLetterGenerator from '@/components/ai/CoverLetterGenerator'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function CoverLetterPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ✨ AI Cover Letter Generator
        </h1>
        <p className="text-gray-500">
          Paste a job description and your background — AI will write a
          personalised cover letter in seconds.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <CoverLetterGenerator />
      </div>
    </div>
  )
}