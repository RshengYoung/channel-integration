🔸Wechat Client
===========

> We will store wechat access token in cache. And refresh it every 7000 seconds.

## Initialize
```js
const wechatClient = new WechatClient(CONFIG)
```

## Message Types
|Text|Sticker|Location|Image|Audio|Video|Template|ImageMap|News|
|:--:|:-----:|:------:|:---:|:---:|:---:|:------:|:------:|:--:|
| ✅ |  ❌  |   ❌  | ✅  | ✅ | ✅  |   ❌   |  ❌   | ✅ |

## Send Message

### Text
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

### Image
```js
wechatClient.send({
    channel: "wechat",
    receiver: "<User id>",
    message: {
        type: "image",
        image: "<Image url (https) or Media id(best)>"
    }
})
```

### Audio
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

### Video
```js
wechatClient.send({
    channel: "wechat",
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

### News
```js
wechatClient.send({
    channel: "wechat",
    receiver: "<User id>",
    message: {
        type: "news",
        columns: [
            {
                title: "<Title>",
                description: "<Description>",
                url: "<Http/Https url>",
                image: "<Image url>"
            },
            ...<Max: 8>
        ]
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