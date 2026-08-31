import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ActivityForm from '@/components/ActivityForm'

jest.mock('@/lib/actions', () => ({
  createActivity: jest.fn().mockResolvedValue({ success: false, error: null }),
  updateActivity: jest.fn().mockResolvedValue({ success: false, error: null }),
}))

describe('ActivityForm', () => {
  it('pergunta o que o usuário fez', () => {
    render(<ActivityForm />)
    expect(screen.getByPlaceholderText('O que você fez?')).toBeInTheDocument()
  })

  it('tem o botão de adicionar atividade', () => {
    render(<ActivityForm />)
    expect(screen.getByRole('button', { name: 'Adicionar atividade' })).toBeInTheDocument()
  })
})