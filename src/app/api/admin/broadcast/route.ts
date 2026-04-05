import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get('admin_token')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { subject, message } = await req.json();

    const subscribers = await prisma.subscriber.findMany({ select: { email: true } });
    if (subscribers.length === 0) return NextResponse.json({ success: true });

    const emails = subscribers.map(s => s.email);

    // If SMTP_USER is not configured, we just log it and pretend it sent for POC locally
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("Emails not really sent because SMTP_USER and SMTP_PASS are missing from .env.");
      console.log(`[BROADCAST SIMULATION] To: ${emails.length} subscribers. Subject: ${subject}`);
      return NextResponse.json({ success: true, simulated: true });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Defaulting to gmail
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Cortex Studio" <${process.env.SMTP_USER}>`,
      bcc: emails, // Use BCC
      subject,
      html: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
