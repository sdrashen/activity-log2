import { render, screen } from '@testing-library/react';
import ActivitySummary from '@/components/ActivitySummary';

describe('ActivitySummary', () => {
  it('mostra o número de atividades', () => {
    render(<ActivitySummary count={5} totalMinutes={120} avgMinutes={24} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('mostra o total de minutos', () => {
    render(<ActivitySummary count={5} totalMinutes={120} avgMinutes={24} />);
    expect(screen.getByText('Tempo total')).toBeInTheDocument();
  });

  it('mostra a média de minutos', () => {
    render(<ActivitySummary count={5} totalMinutes={120} avgMinutes={24} />);
    expect(screen.getByText('Média por atividade')).toBeInTheDocument();
  });
});
