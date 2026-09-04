import 'server-only'

import { prisma } from '@/lib/prisma';
import type { ActivityModel } from '@/app/generated/prisma/models';

function isDatabaseUnavailable(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) return false;
  const code = (error as { code?: string }).code;
  // P1001 = banco inacessível, P1002 = timeout
  return code === 'P1001' || code === 'P1002';
}

type GetActivitiesResult =
  { success: true; data: ActivityModel[] } | { success: false; error: string };

export async function getActivities(): Promise<GetActivitiesResult> {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: { startTime: 'desc' },
    });
    return { success: true, data: activities };
  } catch (error) {
    console.error('Erro ao consultar atividades:', error);

    if (isDatabaseUnavailable(error)) {
      return {
        success: false,
        error: 'O serviço está temporariamente indisponível. Tente novamente em alguns instantes.',
      };
    }

    return { success: false, error: 'Não foi possível carregar as atividades.' };
  }
}

type Summary = {
  count: number;
  totalMinutes: number;
  avgMinutes: number;
};

export type GetSummaryResult = { success: true; data: Summary } | { success: false; error: string };

export async function getActivitySummary(): Promise<GetSummaryResult> {
  try {
    const activities = await prisma.activity.findMany({
      select: {
        startTime: true,
        endTime: true,
      },
    });

    const count = activities.length;
    const totalMinutes = activities.reduce((acc, a) => {
      const diff = Math.floor((a.endTime.getTime() - a.startTime.getTime()) / 60000);
      return acc + diff;
    }, 0);
    const avgMinutes = count > 0 ? Math.round(totalMinutes / count) : 0;

    return { success: true, data: { count, totalMinutes, avgMinutes } };
  } catch (error) {
    console.error('Erro ao calcular consolidado:', error);

    if (isDatabaseUnavailable(error)) {
      return {
        success: false,
        error: 'O serviço está temporariamente indisponível. Tente novamente em alguns instantes.',
      };
    }

    return { success: false, error: 'Não foi possível carregar o consolidado.' };
  }
}
