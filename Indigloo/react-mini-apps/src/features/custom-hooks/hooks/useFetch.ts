import { useState, useEffect } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    setState({ data: null, loading: true, error: null })

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)
        return res.json() as Promise<T>
      })
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => {
        if (err.name === 'AbortError') return
        setState({ data: null, loading: false, error: err.message ?? 'Fetch failed' })
      })

    return () => controller.abort()
  }, [url])

  return state
}
