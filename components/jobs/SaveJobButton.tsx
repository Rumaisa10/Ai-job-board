'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SaveJobButtonProps {
  jobId: string
  initialSaved: boolean
}

export default function SaveJobButton({ jobId, initialSaved }: SaveJobButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSave() {
    setIsLoading(true)

    try {
      const res = await fetch(`/api/jobs/${jobId}/save`, {
        method: 'POST'
      })

      if (res.status === 401) {
       
        router.push('/api/auth/signin')
        return
      }

      const data = await res.json()
      setIsSaved(data.saved)

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
        isSaved
          ? 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100'
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
      } disabled:opacity-50`}
    >
      {isLoading ? '...' : isSaved ? '🔖 Saved' : '🔖 Save Job'}
    </button>
  )
}