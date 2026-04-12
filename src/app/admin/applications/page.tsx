import prisma from "@/lib/prisma";
import ApplicationsClient from "./ApplicationsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminApplicationsPage() {
  const applications = await prisma.jobApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      job: true
    }
  });

  return <ApplicationsClient initialApplications={applications} />;
}
