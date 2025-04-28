// src/app/api/asset/[id]/route.ts
import { prisma } from '@/libs/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const asset = await prisma.asset.findUnique({
    where: { id: params.id },
    include: { schedules: true, records: true },
  })

  if (!asset) {
    return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
  }

  return NextResponse.json(asset)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json()

  const asset = await prisma.asset.update({
    where: { id: params.id },
    data,
  })

  return NextResponse.json(asset)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.asset.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ message: 'Asset deleted' })
}