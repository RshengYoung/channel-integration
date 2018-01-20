Wechat Client
===========

## Initialize
```ts
const wechatClient = new WechatCient(CONFIG)
```

## Send text
```ts
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
```ts
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
```ts
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
```ts
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