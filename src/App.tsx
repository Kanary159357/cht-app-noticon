import KeyboardHandler from '@/components/action/KeyboardHandler'
import ErrorView from '@/components/common/ErrorView'
import LoadingView from '@/components/common/LoadingView'
import EmojiSelectPage from '@/page/EmojiSelectPage'
import { close, setSize } from '@/utils/wam'
import { Suspense, useCallback } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
setSize(600, 600)

function App() {
  const handleEscape = useCallback(() => {
    close()
  }, [])

  return (
    <ErrorBoundary fallback={<ErrorView />}>
      <Suspense fallback={<LoadingView />}>
        <KeyboardHandler keys={['Escape']} handler={handleEscape}>
          <EmojiSelectPage />
        </KeyboardHandler>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
