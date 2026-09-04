import { render, screen } from '@testing-library/react';
import EmptyState from '@/components/EmptyState';

describe('EmptyState', () => {
  it('mostra a mensagem de que não há atividade', () => {
    render(<EmptyState />);
    expect(screen.getByText('Nenhuma atividade registrada')).toBeInTheDocument();
  });

  it('convida o usuário a adicionar atividade', () => {
    render(<EmptyState />);
    expect(screen.getByText('Adicione sua primeira atividade acima')).toBeInTheDocument();
  });
});
