import prisma from "@/lib/prisma";
import JobsClient from "./JobsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { applications: true }
      }
    }
  });

  return <JobsClient initialJobs={jobs} />;
}
