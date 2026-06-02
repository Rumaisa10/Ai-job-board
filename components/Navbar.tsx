import Link from 'next/link'
import { auth, signOut } from '@/lib/auth'

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          AI Job Board
        </Link>

        <div className="flex gap-4 items-center">
          <Link href="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
            Browse Jobs
          </Link>

          {session?.user && (
            <>
              <Link href="/saved" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Saved Jobs
              </Link>
              <Link href="/ai/cover-letter" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                ✨ Cover Letter
              </Link>
              <Link href="/ai/cv-scorer" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                🔍 CV Scorer
              </Link>
            </>
          )}

          <Link href="/post-job" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Post a Job
          </Link>

          {session?.user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{session.user.name}</span>
              <form action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}>
                <button type="submit" className="text-sm text-red-600 hover:underline">
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <Link href="/api/auth/signin" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}