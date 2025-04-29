import { prisma } from '@/libs/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const id = req.url.split('/').pop()
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

  const record = await prisma.record.findUnique({
    where: { id },
    include: { asset: true, schedule: true },
  })

  if (!record) {
    return NextResponse.json({ error: 'Record not found' }, { status: 404 })
  }

  return NextResponse.json(record)
}

export async function PUT(req: NextRequest) {
  const id = req.url.split('/').pop()
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

  const data = await req.json()

  const record = await prisma.record.update({
    where: { id },
    data,
  })

  return NextResponse.json(record)
}

export async function DELETE(req: NextRequest) {
  const id = req.url.split('/').pop()
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

  await prisma.record.delete({
    where: { id },
  })

  return NextResponse.json({ message: 'Record deleted' })
}