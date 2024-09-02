import { ImageMeta } from '@/query/getImageMetaList'
import { callNativeFunction, getWamData } from '@/utils/wam'

export async function sendIconMessage(imageMeta: ImageMeta) {
  const channelId = getWamData('channelId') ?? ''
  const managerId = getWamData('managerId') ?? ''
  const chatId = getWamData('chatId') ?? ''
  const chatType = getWamData('chatType') ?? ''
  const broadcast = Boolean(getWamData('broadcast') ?? '')
  const rootMessageId = getWamData('rootMessageId')
  const isPrivate = Boolean(getWamData('isPrivate'))
  switch (chatType) {
    case 'group': {
      await callNativeFunction('writeGroupMessageAsManager', {
        channelId,
        groupId: chatId,
        rootMessageId,
        broadcast,
        dto: {
          files: [
            {
              mime: 'png',
              fileName: '모르게써!',
              url: imageMeta.imgUrl,
            },
          ],
          managerId,
        },
      })
      break
    }
    case 'directChat': {
      await callNativeFunction('writeDirectChatMessageAsManager', {
        channelId,
        directChatId: chatId,
        rootMessageId,
        broadcast,
        dto: {
          files: [
            {
              mime: 'png',
              fileName: '모르게써!',
              url: imageMeta.imgUrl,
            },
          ],
          managerId,
        },
      })
      break
    }
    case 'userChat': {
      await callNativeFunction('writeUserChatMessageAsManager', {
        channelId,
        userChatId: chatId,
        dto: {
          files: [
            {
              mime: 'png',
              fileName: '모르게써!',
              url: imageMeta.imgUrl,
            },
          ],
          ...(isPrivate
            ? {
                options: ['MESSAGE_OPTION_PRIVATE'],
              }
            : {}),
          managerId,
        },
      })
      break
    }
    default: {
      throw new Error('Invalid chatType')
    }
  }
}
