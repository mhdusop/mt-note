import { prisma } from '@/libs/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const records = await prisma.record.findMany({
    include: { asset: true, schedule: true },
  })
  return NextResponse.json(records)
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const record = await prisma.record.create({
    data: {
      asset_id: body.asset_id,
      schedule_id: body.schedule_id || undefined,
      performed_date: new Date(body.performed_date),
      performed_by: body.performed_by,
      findings: body.findings || undefined,
      action_taken: body.action_taken || undefined,
      status: body.status,
    },
  })

  return NextResponse.json(record)
}
