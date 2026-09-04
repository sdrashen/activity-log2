import { config } from 'dotenv';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

config();

const connectionString = process.env.DATABASE_URL_TEST ?? process.env.DATABASE_URL;

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

async function globalSetup() {
  await prisma.activity.deleteMany();
  await prisma.$disconnect();
}

export default globalSetup;
