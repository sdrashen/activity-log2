'use client'

import { useEffect } from 'react'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Erro na página de atividades:', error)
  }, [error])

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Atividades</h1>

      <div className="bg-red-950 border border-red-800 rounded-xl p-6 text-center">
        <p className="text-red-400 text-lg font-medium mb-2">
          Algo deu errado
        </p>
        <p className="text-slate-400 text-sm mb-6">
          Não foi possível carregar as atividades. Verifique sua conexão e tente novamente.
        </p>
        <button
          onClick={reset}
          className="bg-red-700 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </main>
  )
}