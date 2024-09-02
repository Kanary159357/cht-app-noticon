import ErrorView from '@/components/common/ErrorView'
import Layout from '@/components/common/Layout'
import LoadingView from '@/components/common/LoadingView'
import { Input } from '@/components/ui/input'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import EmojiList from './EmojiList'

function EmojiSelectPage() {
  const [query, setQuery] = useState('')
  return (
    <Layout.Main>
      <Layout.Header>
        <Input
          className="w-80"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          ref={(input) => input && input.focus()}
        />
      </Layout.Header>
      <ErrorBoundary fallback={<ErrorView />}>
        <Suspense fallback={<LoadingView />}>
          <EmojiList query={query} />
        </Suspense>
      </ErrorBoundary>
    </Layout.Main>
  )
}

export default EmojiSelectPage
