import { prisma } from '@/lib/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const records = await prisma.record.findMany({
    include: { asset: true, schedule: true },
  })
  return NextResponse.json(records)
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const record = await prisma.record.create({
    data,
  })

  return NextResponse.json(record)
}
