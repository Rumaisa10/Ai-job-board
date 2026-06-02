'use client'

import { useState } from 'react'

export default function CoverLetterGenerator() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    jobDescription: '',
    userBackground: ''
  })
  const [coverLetter, setCoverLetter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  async function handleGenerate() {
    if (!formData.jobTitle || !formData.company || !formData.jobDescription || !formData.userBackground) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setError('')
    setCoverLetter('')

    try {
      const res = await fetch('/api/ai/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setCoverLetter(data.coverLetter)

    } catch (err) {
      console.error('Error:', err)
      setError('Failed to generate cover letter. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(coverLetter)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input side */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Junior Frontend Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. TechCorp"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste the job description here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Background
          </label>
          <textarea
            name="userBackground"
            value={formData.userBackground}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Briefly describe your experience, skills and achievements..."
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? '✨ Generating...' : '✨ Generate Cover Letter'}
        </button>
      </div>

      {/* Output side */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Generated Cover Letter
          </label>
          {coverLetter && (
            <button
              onClick={handleCopy}
              className="text-sm text-blue-600 hover:underline"
            >
              Copy to clipboard
            </button>
          )}
        </div>

        <div className="w-full h-96 border border-gray-300 rounded-lg p-4 bg-gray-50 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">✨ AI is writing your cover letter...</p>
            </div>
          ) : coverLetter ? (
            <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
              {coverLetter}
            </p>
          ) : (
            <p className="text-gray-400 text-sm">
              Your generated cover letter will appear here...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}