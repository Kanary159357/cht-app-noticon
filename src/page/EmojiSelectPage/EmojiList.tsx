import KeyboardHandler from '@/components/action/KeyboardHandler'
import EmptyView from '@/components/common/EmptyView'
import useDebounceValue from '@/hook/useDebounceValue'
import { getImageMetaList } from '@/query/getImageMetaList'
import { sendIconMessage } from '@/query/sendIconMessage'
import { close } from '@/utils/wam'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { toast } from 'sonner'
import ImageGrid from './ImageGrid'

interface EmojiListProps {
  query: string
}

export default function EmojiList({ query }: EmojiListProps) {
  const [debouncedQuery] = useDebounceValue({ value: query, debounceTime: 800 })

  const { data: images } = useSuspenseQuery({
    queryFn: getImageMetaList,
    queryKey: ['images'],
    select: (data) =>
      data.filter((item) => item.title.includes(debouncedQuery)),
  })

  const { mutate } = useMutation({
    mutationFn: sendIconMessage,
    onSuccess: () => {
      close()
    },
    onError: (error) => {
      toast.error('Error sending message', { description: error.message })
    },
  })
  const handleAction = useCallback(() => {
    if (images.length <= 0) return
    const firstItem = images[0]
    mutate(firstItem)
  }, [images, mutate])

  return (
    <KeyboardHandler handler={handleAction} keys={['Enter']}>
      {images.length !== 0 ? (
        <ImageGrid images={images} onClick={mutate} />
      ) : (
        <EmptyView message="No emojis found" />
      )}
    </KeyboardHandler>
  )
}
