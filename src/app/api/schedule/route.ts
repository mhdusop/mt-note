import { prisma } from '@/libs/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const schedules = await prisma.schedule.findMany({
    include: { asset: true, Record: true },
  })
  return NextResponse.json(schedules)
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const schedule = await prisma.schedule.create({
    data,
  })

  return NextResponse.json(schedule)
}
