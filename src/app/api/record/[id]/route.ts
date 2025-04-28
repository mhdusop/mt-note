import { prisma } from '@/libs/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const record = await prisma.record.findUnique({
    where: { id: params.id },
    include: { asset: true, schedule: true },
  })

  if (!record) {
    return NextResponse.json({ error: 'Record not found' }, { status: 404 })
  }

  return NextResponse.json(record)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json()

  const record = await prisma.record.update({
    where: { id: params.id },
    data,
  })

  return NextResponse.json(record)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.record.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ message: 'Record deleted' })
}
