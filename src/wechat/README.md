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

## Send Message

### Send Text
```js
wechatClient.send({
    channel: "wechat",
    receiver: "<User id>",
    message: {
	type: "text",
        text: "<Message text>"
    }
})
```

### Send Image
```js
wechatClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
        type: "image",
        image: "<Image url (https) or Media id(best)>"
    }
})
```

### Send Audio
```js
wechatClient.send({
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

### Send Video
```js
wechatClient.send({
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

## Upload Media
```js
wechatClient.uploadMedia("<Media type (image, voice, video, thumb)>", "<Media URL>")
    .then(mediaId => {
        .
        .
        .
    })
```