export interface ImageMeta {
  id: number
  title: string
  imgUrl: string
  keywords: string
  date: string
}

export const getImageMetaList = async () => {
  const response = await fetch(
    'https://script.google.com/macros/s/AKfycbw6zKYeWddESrtPTNZP-fjGUF_uWpMyeIVR7zkT16_IlNkMqYo/exec?sheetName=qznqorjaesrgayapt6fs'
  )
  const result = await response.json()
  if (result.ok) {
    const data = result.data as ImageMeta[]
    return data
      .map((item) => ({
        ...item,
        title: String(item.title),
      }))
      .sort((a: ImageMeta, b: ImageMeta) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }) as ImageMeta[]
  } else {
    throw new Error('Failed to fetch data')
  }
}
