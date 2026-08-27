'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { validateActivityInput } from '@/lib/validation';

export type ActivityFormState = {
  success: boolean;
  error: string | null;
};

function isRecordNotFoundError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: string }).code === 'P2025'
  );
}

export async function createActivity(
  _prevState: ActivityFormState,
  formData: FormData
): Promise<ActivityFormState> {
  const validation = validateActivityInput(formData);
  if (!validation.success) return validation;

  try {
    await prisma.activity.create({ data: validation.data });
  } catch (error) {
    console.error('Erro ao criar atividade:', error);
    return { success: false, error: 'Não foi possível salvar a atividade. Tente novamente.' };
  }

  revalidatePath('/activities');
  return { success: true, error: null };
}

export async function updateActivity(
  _prevState: ActivityFormState,
  formData: FormData
): Promise<ActivityFormState> {
  const idRaw = formData.get('id') as string | null;
  const id = Number(idRaw);

  if (!idRaw || isNaN(id)) {
    return { success: false, error: 'Atividade inválida.' };
  }

  const validation = validateActivityInput(formData);
  if (!validation.success) return validation;

  try {
    await prisma.activity.update({ where: { id }, data: validation.data });
  } catch (error) {
    if (isRecordNotFoundError(error)) {
      return {
        success: false,
        error: 'Essa atividade não existe mais — pode já ter sido removida.',
      };
    }
    console.error('Erro ao editar atividade:', error);
    return { success: false, error: 'Não foi possível salvar as alterações. Tente novamente.' };
  }

  revalidatePath('/activities');
  return { success: true, error: null };
}

export async function deleteActivity(id: number): Promise<void> {
  try {
    await prisma.activity.delete({ where: { id } });
  } catch (error) {
    if (!isRecordNotFoundError(error)) {
      console.error('Erro ao remover atividade:', error);
      throw error;
    }
    // se já não existe, não é um erro do ponto de vista do usuário — segue o fluxo
  }

  revalidatePath('/activities');
}
