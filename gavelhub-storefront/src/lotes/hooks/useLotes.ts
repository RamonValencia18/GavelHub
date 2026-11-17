import axios from 'axios'
import { useEffect, useState } from 'react'
import { listarLotes } from '../services/lotesService'
import type { Lote } from '../types/lote'

export function useLotes() {
  const [lotes, setLotes] = useState<Lote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    listarLotes()
      .then(setLotes)
      .catch((requestError: unknown) => {
        if (!axios.isCancel(requestError)) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'No fue posible cargar los lotes',
          )
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return { lotes, loading, error }
}
