import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/models/User'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to save jobs' },
        { status: 401 }
      )
    }

    const { id } = await params
    await connectDB()

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const isSaved = user.savedJobs.includes(id)

    if (isSaved) {
      // unsave
      await User.findByIdAndUpdate(user._id, {
        $pull: { savedJobs: id }
      })
      return NextResponse.json({ saved: false })
    } else {
      // save
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { savedJobs: id }
      })
      return NextResponse.json({ saved: true })
    }

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to save job' },
      { status: 500 }
    )
  }
}