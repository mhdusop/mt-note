import { prisma } from '@/libs/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()

  const user = await prisma.user.update({
    where: { id: params.id },
    data: {
      name: body.name,
      email: body.email,
      role: body.role, 
    },
  })

  return NextResponse.json(user)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.user.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ message: 'User deleted' })
}
