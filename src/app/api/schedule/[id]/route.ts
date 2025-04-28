import { prisma } from '@/libs/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const schedule = await prisma.schedule.findUnique({
    where: { id: params.id },
    include: { asset: true, Record: true },
  })

  if (!schedule) {
    return NextResponse.json({ error: 'Schedule not found' }, { status: 404 })
  }

  return NextResponse.json(schedule)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json()

  const schedule = await prisma.schedule.update({
    where: { id: params.id },
    data,
  })

  return NextResponse.json(schedule)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.schedule.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ message: 'Schedule deleted' })
}
