import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowLeft, RefreshCcw } from 'lucide-react'

interface ErrorViewProps {
  title?: string
  message?: string
  code?: string | number
  retry?: () => void
  goBack?: () => void
}

export default function ErrorView({
  title = 'An error occurred',
  message = "We're sorry, but something went wrong. Please try again later.",
  code,
  retry,
  goBack,
}: ErrorViewProps = {}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-lg font-semibold">{title}</AlertTitle>
          <AlertDescription className="mt-2">
            {message}
            {code && (
              <span className="mt-2 block text-sm">
                Error code: <code className="font-mono">{code}</code>
              </span>
            )}
          </AlertDescription>
        </Alert>
        <div className="flex justify-center space-x-4">
          {goBack && (
            <Button variant="outline" onClick={goBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          )}
          {retry && (
            <Button onClick={retry}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
