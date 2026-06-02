'use client'

import { useState } from 'react'

interface CVAnalysis {
  score: number
  summary: string
  strengths: string[]
  missingSkills: string[]
  suggestions: string[]
}

export default function CVScorer() {
  const [cvText, setCvText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAnalyse() {
    if (!cvText || !jobDescription) {
      setError('Please fill in both fields')
      return
    }

    setIsLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const res = await fetch('/api/ai/cv-scorer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText, jobDescription })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setAnalysis(data)

    } catch (err) {
      setError('Failed to analyse CV. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  function getScoreColor(score: number) {
    if (score >= 75) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  function getScoreBg(score: number) {
    if (score >= 75) return 'bg-green-50 border-green-200'
    if (score >= 50) return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <div className="space-y-6">
      {/* Input section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your CV
          </label>
          <textarea
            value={cvText}
            onChange={e => setCvText(e.target.value)}
            rows={12}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste your CV text here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            rows={12}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste the job description here..."
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleAnalyse}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isLoading ? '🔍 Analysing...' : '🔍 Analyse My CV'}
      </button>

      {/* Results section */}
      {analysis && (
        <div className="space-y-6">

          {/* Score */}
          <div className={`border rounded-lg p-6 text-center ${getScoreBg(analysis.score)}`}>
            <p className="text-sm font-medium text-gray-600 mb-1">Match Score</p>
            <p className={`text-6xl font-bold ${getScoreColor(analysis.score)}`}>
              {analysis.score}%
            </p>
            <p className="text-gray-600 mt-3">{analysis.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Strengths */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-3">
                ✅ Strengths
              </h3>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, i) => (
                  <li key={i} className="text-green-700 text-sm">
                    • {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Skills */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-3">
                ❌ Missing Skills
              </h3>
              <ul className="space-y-2">
                {analysis.missingSkills.map((skill, i) => (
                  <li key={i} className="text-red-700 text-sm">
                    • {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-3">
                💡 Suggestions
              </h3>
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion, i) => (
                  <li key={i} className="text-blue-700 text-sm">
                    • {suggestion}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}