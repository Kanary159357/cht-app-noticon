export function getWamData(key: string) {
  if (typeof window.ChannelIOWam.getWamData === 'function') {
    return window.ChannelIOWam.getWamData(key)
  }
  return undefined
}

export function close(
  appId?: string,
  name?: string,
  params?: Record<string, any>
) {
  if (typeof window.ChannelIOWam.close === 'function') {
    if (appId && name) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return window.ChannelIOWam.close({ appId, name, params })
    }
    return window.ChannelIOWam.close()
  }
}

export function setSize(width: number, height: number) {
  if (typeof window.ChannelIOWam?.setSize === 'function') {
    return window.ChannelIOWam.setSize({ width, height })
  }
}

export async function callFunction(
  appId: string,
  name: string,
  params: Record<string, any>
) {
  if (typeof window.ChannelIOWam.callFunction === 'function') {
    return window.ChannelIOWam.callFunction({ appId, name, params })
  }
  return Promise.reject()
}

export async function callNativeFunction(
  name: string,
  params: Record<string, any>
) {
  if (typeof window.ChannelIOWam.callNativeFunction === 'function') {
    return window.ChannelIOWam.callNativeFunction({ name, params })
  }
  return Promise.reject()
}

export function callCommand(
  appId: string,
  name: string,
  params: Record<string, any>
) {
  if (typeof window.ChannelIOWam.callCommand === 'function') {
    return window.ChannelIOWam.callCommand({ appId, name, params })
  }
}

export function injectDevMock() {
  window.ChannelIOWam = {
    getWamData: (key: string) => {
      if (key === 'channelId') {
        return 'channelId'
      }
      if (key === 'managerId') {
        return 'managerId'
      }
      if (key === 'chatId') {
        return 'chatId'
      }
      if (key === 'chatType') {
        return 'chatType'
      }
      if (key === 'broadcast') {
        return 'broadcast'
      }
      if (key === 'rootMessageId') {
        return 'rootMessageId'
      }
      if (key === 'isPrivate') {
        return 'isPrivate'
      }
      return undefined
    },
    close: () => {},
    setSize: () => {},
    callFunction: () => Promise.resolve(),
    callNativeFunction: () => Promise.resolve(),
    callCommand: () => {},
  }
}
