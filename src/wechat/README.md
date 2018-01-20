Wechat Client
===========

## Initialize
```js
const wechatClient = new WechatCient(CONFIG)
```

## Message types
|Text|Sticker|Location|Image|Audio|Video|Template|
|:--:|:-----:|:------:|:---:|:---:|:---:|:------:|
| ✅ |  ❌  |   ❌  | ✅  | ✅ | ✅  |   ❌   |

## Send text
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

## Send image
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

## Send audio
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

## Send video
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
