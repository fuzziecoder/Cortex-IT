import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import * as z from 'zod';

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  city: z.string().min(2),
  state: z.string().min(2),
  services: z.array(z.string()).min(1),
  description: z.string().min(10),
  budget: z.string().min(1),
  timeline: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = formSchema.parse(body);

    const contact = await prisma.contactRequest.create({
      data: {
        ...validated,
        services: JSON.stringify(validated.services),
      },
    });

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
