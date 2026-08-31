import { validateActivityInput } from '@/lib/validation'

function makeFormData(data: Record<string, string>): FormData {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, value));
  return formData;
}

describe('validateActivityInput', () => {
  it('retorna erro quando a descrição está vazia', () => {
    const formData = makeFormData({
      description: '',
      startTime: '2024-01-01T09:00',
      endTime: '2024-01-01T10:00',
    });
    const result = validateActivityInput(formData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('A descrição é obrigatória.');
    }
  });

  it('retorna erro quando o horário de início está vazio', () => {
    const formData = makeFormData({
      description: 'Reunião',
      startTime: '',
      endTime: '2024-01-01T10:00',
    });
    const result = validateActivityInput(formData);
    expect(result.success).toBe(false);
  });

  it('retorna erro quando o término é antes do início', () => {
    const formData = makeFormData({
      description: 'Reunião',
      startTime: '2024-01-01T10:00',
      endTime: '2024-01-01T09:00',
    });
    const result = validateActivityInput(formData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('O término deve ser depois do início.');
    }
  });

  it('retorna sucesso com dados válidos', () => {
    const formData = makeFormData({
      description: 'Reunião',
      startTime: '2024-01-01T09:00',
      endTime: '2024-01-01T10:00',
    });
    const result = validateActivityInput(formData);
    expect(result.success).toBe(true);
  });
});
