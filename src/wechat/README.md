Wechat Client
===========

## Initialize
```js
const wechatClient = new WechatClient(CONFIG)
```

## Message Types
|Text|Sticker|Location|Image|Audio|Video|Template|
|:--:|:-----:|:------:|:---:|:---:|:---:|:------:|
| ✅ |  ❌  |   ❌  | ✅  | ✅ | ✅  |   ❌   |

## Send Text
```js
lineClient.send({
    channel: "wechat",
    receiver: "<User id>",
    message: {
	type: "text",
        text: "<Message text>"
    }
})
```

## Send Image
```js
lineClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
        type: "image",
        image: "<Image url (https) or Media id(best)>"
    }
})
```

## Send Audio
```js
lineClient.send({
    channel: "wechat",
    receiver: "<User id>",
    message: {
        type: "audio",
        video: {
            audioUrl: "<Audio url (https) (AMR, MP3) or Media id(best)>",
            duration: <Audio length>
        }
    }
})
```

## Send Video
```js
lineClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
        type: "video",
        video: {
            title: "<Video title>",
            description: "<Video description>",
            previewImage: "<Preview image (https) (jpg) or Media id(best)>",
            videoUrl: "<Video url (https) (mp4) or Media id(best)>"
        }
    }
})
```
