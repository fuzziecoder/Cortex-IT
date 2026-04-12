import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      jobId, 
      firstName, 
      lastName, 
      email,
      phone, 
      linkedinUrl, 
      portfolioUrl, 
      message,
      jobAlert,
      resumeName,
      resumeBase64
    } = body;

    let finalResumeUrl: string | null = null;
    
    // Process Resume Document Upload
    if (resumeBase64 && resumeName) {
      try {
        const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // Sanitize filename and add timestamp to avoid collisions
        const safeName = resumeName.replace(/[^a-zA-Z0-9.\-_]/g, "_").toLowerCase();
        const uniqueFileName = `${Date.now()}-${safeName}`;
        const filePath = path.join(uploadDir, uniqueFileName);
        
        // Decode base64 and write to file
        const fileBuffer = Buffer.from(resumeBase64, "base64");
        fs.writeFileSync(filePath, fileBuffer);
        
        finalResumeUrl = `/uploads/resumes/${uniqueFileName}`;
      } catch (err) {
        console.error("Failed to save resume file:", err);
      }
    }

    // --- Database Warm-up / Connection Handling ---
    // If the database is cold (Neon sleep), the first query might time out.
    // This small check helps "wake up" the DB before we start complex operations.
    let connected = false;
    let attempts = 0;
    while (!connected && attempts < 2) {
      try {
        await prisma.$queryRaw`SELECT 1`;
        connected = true;
      } catch (e) {
        attempts++;
        if (attempts >= 2) throw e;
        console.log(`Database connection attempt ${attempts} failed, waiting to retry...`);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3s for Neon to wake up
      }
    }

    // Handle Job Alert Subscription
    if (jobAlert) {
      try {
        await prisma.subscriber.upsert({
          where: { email },
          update: {}, 
          create: { email },
        });
      } catch (subErr) {
        console.error("Failed to add subscriber from job application (non-fatal):", subErr);
        // We don't fail the whole application if subscription fails
      }
    }

    // Determine if jobId is a sample or real DB job
    const isSampleJob = jobId?.startsWith("sample-");

    let application;
    let jobTitle = "Unknown Role";

    if (isSampleJob) {
      const sampleTitles: Record<string, string> = {
        "sample-1": "Digital Marketing Manager",
        "sample-2": "Fresher Dev-Ops Engineer",
        "sample-3": "Technology Analyst: Data Science",
        "sample-4": "Senior Frontend Engineer",
        "sample-5": "AI Engineer (Deep Learning)",
        "sample-6": "Project Manager",
      };
      jobTitle = sampleTitles[jobId] || "General Application";

      // Try to find or create the job
      let dbJob = await prisma.job.findUnique({ where: { id: jobId } });
      if (!dbJob) {
        dbJob = await prisma.job.create({
          data: {
            id: jobId,
            title: jobTitle,
            description: `Sample job listing for ${jobTitle}`,
            department: "General",
            locationType: "Remote",
            employmentType: "Full-time",
            salaryRange: "Competitive",
            isActive: true,
          },
        });
      }

      application = await prisma.jobApplication.create({
        data: {
          jobId: dbJob.id,
          firstName,
          lastName,
          email,
          phone,
          linkedinUrl,
          portfolioUrl,
          resumeUrl: finalResumeUrl,
          message: message || "No additional message",
          status: "Pending",
        },
        include: { job: true },
      });
    } else {
      // Real DB job
      application = await prisma.jobApplication.create({
        data: {
          jobId,
          firstName,
          lastName,
          email,
          phone,
          linkedinUrl,
          portfolioUrl,
          resumeUrl: finalResumeUrl,
          message: message || "No additional message",
          status: "Pending",
        },
        include: { job: true },
      });
      jobTitle = application.job.title;
    }

    // Send Email Notification
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"Cortex IT Careers" <${process.env.SMTP_USER}>`,
        to: "ramvj2005@gmail.com",
        subject: `New Job Application: ${jobTitle} from ${firstName} ${lastName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #00bfff;">New Application Received</h2>
            <p><strong>Candidate:</strong> ${firstName} ${lastName}</p>
            <p><strong>Role:</strong> ${jobTitle}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>LinkedIn:</strong> ${linkedinUrl || 'N/A'}</p>
            <p><strong>Portfolio:</strong> ${portfolioUrl || 'N/A'}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${message || 'No additional message'}</p>
            <br />
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/applications" style="background: #00bfff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Panel</a>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error("Email send error (non-fatal):", emailErr);
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
