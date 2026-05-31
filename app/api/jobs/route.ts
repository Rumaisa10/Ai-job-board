import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Job } from '@/models/Job'
import { IJob } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    const location = searchParams.get('location')

    const filter: Partial<IJob> = {}
    if (type) filter.type = type as IJob['type']
    if (location) filter.location = location

    const jobs = await Job.find(filter).sort({ createdAt: -1 }).lean()
    return NextResponse.json(JSON.parse(JSON.stringify(jobs)))

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const job = await Job.create(body)
    return NextResponse.json(job, { status: 201 })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    )
  }
}