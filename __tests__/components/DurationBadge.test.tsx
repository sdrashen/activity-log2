import { render, screen } from '@testing-library/react';
import DurationBadge from '@/components/DurationBadge';

describe('DurationBadge', () => {
  it('mostra a duração das atividades', () => {
    render(<DurationBadge duration="1h 30min" />);
    expect(screen.getByText('1h 30min')).toBeInTheDocument();
  });

  it('mostra a duração das atividades apenas em minutos', () => {
    render(<DurationBadge duration="45min" />);
    expect(screen.getByText('45min')).toBeInTheDocument();
  });
});
