import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { callNativeFunction, getWamData } from './utils/wam';

interface ImageMeta{
  id: number;
  title: string;
  imgUrl: string;
  keywords: string;
  date: string;
}

function App() {
  const [data, setData] = useState<ImageMeta[]>([]);
  const channelId = useMemo(() => getWamData('channelId') ?? '', [])
  const managerId = useMemo(() => getWamData('managerId') ?? '', [])
  const chatId = useMemo(() => getWamData('chatId') ?? '', [])
  const chatType = useMemo(() => getWamData('chatType') ?? '', [])
  const broadcast = useMemo(() => Boolean(getWamData('broadcast') ?? ''), [])
  const rootMessageId = useMemo(() => getWamData('rootMessageId'), [])
  const isPrivate = useMemo(() => Boolean(getWamData('isPrivate')), [])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbw6zKYeWddESrtPTNZP-fjGUF_uWpMyeIVR7zkT16_IlNkMqYo/exec?sheetName=qznqorjaesrgayapt6fs');
        const result = await response.json();
        if (result.ok) {
          setData(result.data.sort((a: ImageMeta, b: ImageMeta) => {
          return (new Date(b.date).getTime()) - (new Date(a.date).getTime())
        }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleSend = useCallback(async (imageMeta:ImageMeta) => {
    setIsLoading(true)
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
                mime: "png",
                fileName: "모르게써!",
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
                mime: "png",
                fileName: "모르게써!",
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
                mime: "png",
                fileName: "모르게써!",
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
        // NOTE: should not reach here
        console.error('Invalid chatType')
      }
    }

    setIsLoading(false)
  }, [broadcast, channelId, chatId, chatType, isPrivate, managerId, rootMessageId])






  return (
    <ol style={{
      maxWidth: "600px",
      gridTemplateColumns: "repeat(4, 1fr)",
      display: 'grid',
      gridTemplateRows: '1fr',
      position: 'relative',
      padding: '36px 0px',
      margin: '0',
    }}>
      {data.length > 0 ? (
        data.map((item) => (
          <li key={item.id} 
            onClick={()=>handleSend(item)}
          style={{
            display: "flex",
            overflow: "hidden",
            minHeight: "106px",
            "flexDirection": "column",
            "alignItems": "center",
            "marginBottom": "30px",
          }}>

          <div 
            style={{
              width: "100%",
              position: "relative",
              flex: "1 1 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img 
            style={{
              width: "50%",
              height: "auto",
              position: "absolute",
            }}
            src={item.imgUrl} alt={item.title} />
          </div>
          <span style={{
            width: "100%",
               "textOverflow": "ellipsis",
               "overflow": "hidden",
               "whiteSpace": "nowrap",
               textAlign: "center",
          }}>{item.title}</span>
          </li>

        ))
      ) : (
        <p>Loading...</p>
      )}
    </ol>
  );
}

export default App;