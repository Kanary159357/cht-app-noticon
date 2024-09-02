import { Button } from '@/components/ui/button'
import { ImageMeta } from '@/query/getImageMetaList'
import { memo } from 'react'
import { FixedSizeGrid as Grid } from 'react-window'

const COLUMN_COUNT = 4
const ITEM_WIDTH = 125
const ITEM_HEIGHT = 150

const ImageGrid = ({
  images,
  onClick,
}: {
  images: ImageMeta[]
  onClick: (item: ImageMeta) => void
}) => {
  const Cell = ({ columnIndex, rowIndex, style }) => {
    const itemIndex = rowIndex * COLUMN_COUNT + columnIndex
    if (itemIndex >= images.length) return null // Avoid rendering empty cells

    const item = images[itemIndex]

    return (
      <div style={style}>
        <Button
          variant="ghost"
          key={item.id}
          onClick={() => onClick(item)}
          className="mb-8 flex min-h-[106px] w-[125px] cursor-pointer flex-col items-center overflow-hidden"
        >
          <div className="relative flex w-full flex-1 justify-center">
            <img
              className="absolute h-auto w-1/2"
              src={item.imgUrl}
              alt={item.title}
              loading="lazy"
            />
          </div>
          <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center">
            {item.title}
          </span>
        </Button>
      </div>
    )
  }

  return (
    <Grid
      className="relative m-auto my-0 px-0"
      columnCount={COLUMN_COUNT}
      columnWidth={ITEM_WIDTH}
      height={500}
      rowCount={Math.ceil(images.length / COLUMN_COUNT)}
      rowHeight={ITEM_HEIGHT}
      width={COLUMN_COUNT * ITEM_WIDTH}
    >
      {Cell}
    </Grid>
  )
}

export default memo(ImageGrid)
