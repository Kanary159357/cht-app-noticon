import { useEffect, useState } from 'react'

interface UseDebounceValueProps<T> {
  value: T
  debounceTime?: number
}

export default function useDebounceValue<T>({
  value,
  debounceTime = 300,
}: UseDebounceValueProps<T>) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
      setLoading(false)
    }, debounceTime)
    return () => {
      clearTimeout(timeout)
    }
  }, [debounceTime, value])
  return [debouncedValue, loading] as const
}
