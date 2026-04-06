import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import * as z from 'zod';
import nodemailer from 'nodemailer';

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

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER || 'ramvj2005@gmail.com',
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: '"Cortex System" <ramvj2005@gmail.com>',
        to: 'ramvj2005@gmail.com',
        subject: `New Project Inquiry from ${validated.firstName} ${validated.lastName}`,
        html: `
          <h2>New Contact Request</h2>
          <p><strong>Name:</strong> ${validated.firstName} ${validated.lastName}</p>
          <p><strong>Email:</strong> ${validated.email}</p>
          <p><strong>Phone:</strong> ${validated.phone}</p>
          <p><strong>Location:</strong> ${validated.city}, ${validated.state}</p>
          <p><strong>Budget:</strong> ${validated.budget}</p>
          <p><strong>Timeline:</strong> ${validated.timeline}</p>
          <p><strong>Services:</strong> ${validated.services.join(', ')}</p>
          <h3>Description:</h3>
          <p>${validated.description}</p>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('Notification email sent successfully.');
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // We don't return an error response here so the user form submission doesn't fail just because the email delivery failed
    }

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

