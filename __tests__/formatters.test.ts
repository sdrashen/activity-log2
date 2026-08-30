import { formatTime, formatDuration, toDatetimeLocalValue, formatMinutes } from '@/lib/formatters'

describe('formatTime', () => {
  it('formata corretamente o horário', () => {
    const date = new Date('2024-01-01T09:30:00');
    const result = formatTime(date);
    expect(result).toBe('09:30');
  });
});

describe('formatDuration', () => {
  it('retorna apenas minutos quando duração é menor que 1 hora', () => {
    const start = new Date('2024-01-01T09:00:00');
    const end = new Date('2024-01-01T09:30:00');
    expect(formatDuration(start, end)).toBe('30min');
  });

  it('retorna horas e minutos quando duração é maior que 1 hora', () => {
    const start = new Date('2024-01-01T09:00:00');
    const end = new Date('2024-01-01T10:30:00');
    expect(formatDuration(start, end)).toBe('1h 30min');
  });
});

describe('toDatetimeLocalValue', () => {
  it('formata corretamente para o input datetime-local', () => {
    const date = new Date('2024-01-15T09:05:00');
    const result = toDatetimeLocalValue(date);
    expect(result).toBe('2024-01-15T09:05');
  });
});

describe('formatMinutes', () => {
  it('retorna apenas minutos quando menor que 60', () => {
    expect(formatMinutes(30)).toBe('30min');
  });

  it('retorna apenas horas quando divisível por 60', () => {
    expect(formatMinutes(120)).toBe('2h');
  });

  it('retorna horas e minutos no formato correto', () => {
    expect(formatMinutes(90)).toBe('1h 30min');
  });
});
