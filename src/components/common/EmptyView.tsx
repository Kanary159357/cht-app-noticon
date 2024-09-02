import { Button } from '@/components/ui/button'
import { FileX2 } from 'lucide-react'

interface EmptyListViewProps {
  message?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyView({
  message = 'No items found',
  description = "Try adjusting your search or filters to find what you're looking for.",
  actionLabel,
  onAction,
}: EmptyListViewProps = {}) {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center p-4 text-center">
      <FileX2 className="mb-4 h-16 w-16 text-muted-foreground" />
      <h3 className="mb-2 text-lg font-semibold text-foreground">{message}</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
