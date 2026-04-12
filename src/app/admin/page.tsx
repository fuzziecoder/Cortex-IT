import prisma from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  let contactCount = 0;
  let subCount = 0;
  let jobAppCount = 0;
  let projectCount = 0;
  let partnerCount = 0;
  let jobCount = 0;
  let allApplications: any[] = [];
  
  try {
    contactCount = await prisma.contactRequest.count();
    subCount = await prisma.subscriber.count();
    jobAppCount = await prisma.jobApplication.count();
    projectCount = await prisma.project.count();
    partnerCount = await prisma.partner.count();
    jobCount = await prisma.job.count();
    allApplications = await prisma.jobApplication.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        }
      },
      select: {
        id: true,
        createdAt: true,
      }
    });

  } catch (err) {
    console.error("Dashboard DB fetch error:", err);
  }

  // Pre-process real data for the charts
  // Groups applications by the day of the month (1-31)
  const activityMap: Record<number, number> = {};
  allApplications.forEach((app) => {
    const day = new Date(app.createdAt).getDate();
    if (!activityMap[day]) activityMap[day] = 0;
    activityMap[day]++;
  });

  const payload = {
    stats: {
      contacts: contactCount,
      subscribers: subCount,
      applications: jobAppCount,
      projects: projectCount,
      partners: partnerCount,
      jobs: jobCount,
    },
    activityMap,
  };

  return <AdminDashboardClient data={payload} />;
}
