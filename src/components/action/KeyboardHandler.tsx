import { useEffect } from 'react'

interface KeyboardHandlerProps {
  children: React.ReactNode
  keys: string[]
  handler: (event: KeyboardEvent) => void
}

export default function KeyboardHandler({
  children,
  keys,
  handler,
}: KeyboardHandlerProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (keys.includes(event.key)) {
        handler(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handler, keys])

  return <>{children}</>
}
