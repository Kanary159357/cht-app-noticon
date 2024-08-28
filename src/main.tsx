import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
console.log()
if(import.meta.env.MODE === "development"){
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


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
