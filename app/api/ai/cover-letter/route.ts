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

    const { jobTitle, company, jobDescription, userBackground } =
      await request.json()

    const prompt = `
      Write a professional cover letter for the following job:
      
      Job Title: ${jobTitle}
      Company: ${company}
      Job Description: ${jobDescription}
      
      Candidate Background: ${userBackground}
      
      Requirements:
      - Professional and compelling tone
      - 3-4 paragraphs
      - Highlight relevant skills from the candidate background
      - Show enthusiasm for the role and company
      - End with a strong call to action
      - Do not include placeholders like [Your Name] or [Date]
    `

    const result = await geminiModel.generateContent(prompt)
    const coverLetter = result.response.text()

    return NextResponse.json({ coverLetter })

  } catch (error) {
    console.error('Cover letter error FULL:', JSON.stringify(error, null, 2))
  console.error('Cover letter error MESSAGE:', error)
    console.error('Cover letter error:', error)
    return NextResponse.json(
      { error: 'Failed to generate cover letter' },
      { status: 500 }
    )
  }
}