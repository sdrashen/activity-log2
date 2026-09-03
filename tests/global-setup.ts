import { config } from 'dotenv'
import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

config()

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL_TEST,
})

const prisma = new PrismaClient({ adapter })

async function globalSetup() {
  await prisma.activity.deleteMany()
  await prisma.$disconnect()
}

export default globalSetup