export type ValidatedActivityData = {
  description: string
  startTime: Date
  endTime: Date
}

export type ValidationResult =
  | { success: true; data: ValidatedActivityData }
  | { success: false; error: string }

export function validateActivityInput(formData: FormData): ValidationResult {
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

  return { success: true, data: { description, startTime, endTime } }
}