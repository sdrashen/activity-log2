import { prisma } from '@/lib/prisma'
import type { ActivityModel } from '@/app/generated/prisma/models'

type GetActivitiesResult =
  | { success: true; data: ActivityModel[] }
  | { success: false; error: string }

export async function getActivities(): Promise<GetActivitiesResult> {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: { startTime: 'desc' },
    })
    return { success: true, data: activities }
  } catch (error) {
    console.error('Erro ao consultar atividades:', error)
    return { success: false, error: 'Não foi possível carregar as atividades.' }
  }
}