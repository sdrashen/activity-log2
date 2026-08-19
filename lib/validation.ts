import { z } from 'zod'

export const ActivitySchema = z.object({
  description: z
    .string()
    .min(1, 'A descrição é obrigatória.')
    .max(200, 'A descrição deve ter no máximo 200 caracteres.'),

  startTime: z
    .string()
    .min(1, 'O horário de início é obrigatório.')
    .transform((val) => new Date(val))
    .refine((d) => !isNaN(d.getTime()), 'Horário de início inválido.'),

  endTime: z
    .string()
    .min(1, 'O horário de término é obrigatório.')
    .transform((val) => new Date(val))
    .refine((d) => !isNaN(d.getTime()), 'Horário de término inválido.'),
})
.refine(
  (data) => data.endTime > data.startTime,
  {
    message: 'O término deve ser depois do início.',
    path: ['endTime'],
  }
)

export type ValidatedActivityData = z.infer<typeof ActivitySchema>

export type ValidationResult =
  | { success: true; data: ValidatedActivityData }
  | { success: false; error: string }

export function validateActivityInput(formData: FormData): ValidationResult {
  const raw = {
    description: (formData.get('description') as string | null)?.trim() ?? '',
    startTime: (formData.get('startTime') as string | null) ?? '',
    endTime: (formData.get('endTime') as string | null) ?? '',
  }

  const result = ActivitySchema.safeParse(raw)

  if (!result.success) {
    const firstIssue = result.error.issues[0]
    return { success: false, error: firstIssue.message }
  }

  return { success: true, data: result.data }
}