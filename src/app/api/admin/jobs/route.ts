import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all jobs (including inactive)
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { applications: true }
        }
      }
    });
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST create a new job
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const job = await prisma.job.create({
      data: {
        title: body.title,
        description: body.description,
        department: body.department,
        locationType: body.locationType,
        employmentType: body.employmentType,
        salaryRange: body.salaryRange,
        isActive: body.isActive ?? true,
      }
    });
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
