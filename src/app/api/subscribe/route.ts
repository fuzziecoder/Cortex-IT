import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);

    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (!existing) {
      await prisma.subscriber.create({ data: { email } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
