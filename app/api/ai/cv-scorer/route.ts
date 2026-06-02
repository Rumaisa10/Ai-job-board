import { NextRequest, NextResponse } from 'next/server'
import { geminiModel } from '@/lib/gemini'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      )
    }

    const { cvText, jobDescription } = await request.json()

    const prompt = `
      Analyse this CV against the job description and return a JSON response only.
      No markdown, no backticks, just pure JSON.

      CV:
      ${cvText}

      Job Description:
      ${jobDescription}

      Return this exact JSON structure:
      {
        "score": <number 0-100>,
        "summary": "<2 sentence overall assessment>",
        "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
        "missingSkills": ["<skill 1>", "<skill 2>", "<skill 3>"],
        "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"]
      }
    `

    const result = await geminiModel.generateContent(prompt)
    const text = result.response.text()

    const analysis = JSON.parse(text)

    return NextResponse.json(analysis)

  } catch (error) {
  console.error('CV scorer error:', error)
  return NextResponse.json(
    { error: 'Failed to analyse CV' },
    { status: 500 }
  )
}
}