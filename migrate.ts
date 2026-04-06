import Database from 'better-sqlite3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const db = new Database('./prisma/dev.db');

async function main() {
  console.log('Migrating data from SQLite to Postgres...');

  // 1. Projects
  const projects = db.prepare('SELECT * FROM Project').all() as any[];
  for (const p of projects) {
    try {
      await prisma.project.upsert({
        where: { id: p.id },
        update: {},
        create: {
          ...p,
          createdAt: p.createdAt ? new Date(p.createdAt) : undefined,
        },
      });
      console.log(`Migrated Project: ${p.title}`);
    } catch (e) {
      console.error(`Error migrating project: ${p.id}`, e);
    }
  }

  // 2. Partners
  const partners = db.prepare('SELECT * FROM Partner').all() as any[];
  for (const p of partners) {
    try {
      await prisma.partner.upsert({
        where: { id: p.id },
        update: {},
        create: {
          ...p,
          createdAt: p.createdAt ? new Date(p.createdAt) : undefined,
        },
      });
      console.log(`Migrated Partner: ${p.name}`);
    } catch (e) {
      console.error(`Error migrating partner: ${p.id}`, e);
    }
  }

  // 3. Contacts
  const contacts = db.prepare('SELECT * FROM ContactRequest').all() as any[];
  for (const c of contacts) {
    try {
      await prisma.contactRequest.upsert({
        where: { id: c.id },
        update: {},
        create: {
          ...c,
          createdAt: c.createdAt ? new Date(c.createdAt) : undefined,
        },
      });
      console.log(`Migrated Contact: ${c.email}`);
    } catch (e) {
      console.error(`Error migrating contact: ${c.id}`, e);
    }
  }

  // 4. Subscribers
  const subscribers = db.prepare('SELECT * FROM Subscriber').all() as any[];
  for (const s of subscribers) {
    try {
      await prisma.subscriber.upsert({
        where: { id: s.id },
        update: {},
        create: {
          ...s,
          createdAt: s.createdAt ? new Date(s.createdAt) : undefined,
        },
      });
      console.log(`Migrated Subscriber: ${s.email}`);
    } catch (e) {
      console.error(`Error migrating subscriber: ${s.id}`, e);
    }
  }

  console.log('Migration complete!');
}

main()
  .catch(console.error)
  .finally(() => {
    prisma.$disconnect();
    db.close();
  });
