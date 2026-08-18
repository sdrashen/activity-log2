'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export type CreateActivityState = {
  success: boolean
  error: string | null
}

export async function createActivity(
  _prevState: CreateActivityState,
  formData: FormData
): Promise<CreateActivityState> {
  const description = (formData.get('description') as string | null)?.trim() ?? ''
  const startTimeRaw = formData.get('startTime') as string | null
  const endTimeRaw = formData.get('endTime') as string | null

  if (!description) {
    return { success: false, error: 'A descrição é obrigatória.' }
  }
  if (!startTimeRaw || !endTimeRaw) {
    return { success: false, error: 'Preencha os horários de início e término.' }
  }

  const startTime = new Date(startTimeRaw)
  const endTime = new Date(endTimeRaw)

  if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
    return { success: false, error: 'Horários inválidos.' }
  }

  if (endTime.getTime() <= startTime.getTime()) {
    return { success: false, error: 'O término deve ser depois do início.' }
  }

  try {
    await prisma.activity.create({
      data: { description, startTime, endTime },
    })
  } catch (error) {
    console.error('Erro ao criar atividade:', error)
    return { success: false, error: 'Não foi possível salvar a atividade. Tente novamente.' }
  }

  revalidatePath('/activities')
  return { success: true, error: null }
}