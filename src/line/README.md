🔸Line Client
===========

## Initialize
```js
const lineClient = new LineClient(CONFIG)
```

## Message Types
|Text|Sticker|Location|Image|Audio|Video|Template|News|
|:--:|:-----:|:------:|:---:|:---:|:---:|:------:|:--:|
| ✅ |  ✅  |   ✅  | ✅  | ✅ | ✅  |   ✅   | ❌|

## Send Message

### Text
```js
lineClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
	type: "text",
        text: "<Message text>"
    }
})
```

### Sticker
```js
lineClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
        type: "sticker",
        sticker: {
            packageId: "<Package id>",
            stickerId: "<Sticker id>"
        }
    }
})
```

### Location
```js
lineClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
        type: "location",
        location: {
            title: "<Location title>",
            address: "<Location adress>",
            latitude: <Location latitude>,
            longitude: <Location longitude>
        }
    }
})
```

### Image
```js
lineClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
        type: "image",
        image: "<Image url (https)>"
    }
})
```


### Audio
```js
lineClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
        type: "audio",
        video: {
            audioUrl: "<Audio url (https) (AMR, MP3)>",
            duration: <Audio length>
        }
    }
})
```

### Video
```js
lineClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
        type: "video",
        video: {
            title: "<Video title>",
            description: "<Video description>",
            previewImage: "<Preview image (https) (jpg)>",
            videoUrl: "<Video url (https) (mp4)>"
        }
    }
})
```

### Template (buttons)
```js
lineClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
        type: "template",
        description: "<Message description>"
        template: {
            type: "buttons",
            thumbnailImageUrl: "<Image url (https)>",
            title: "<Template title>",
            text: "<Template text>",
            actions: [
                {
                    type: "<Action type (postback, message, uri)>",
                    label: "<Button label>",
                    text?: "<Message text>",
                    data?: "<Postback data>",
                    uri?: "<Http url>"
                },
                ....
            ]
        }
    }
})
```

### Template (confirm)
```js
lineClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
        type: "template",
        description: "<Message description>"
        template: {
            type: "confirm",
            thumbnailImageUrl: "<Image url (https)>",
            title: "<Template title>",
            text: "<Template text>",
            actions: [
                {
                    type: "<Action type (postback, message, uri)>",
                    label: "<Button label>",
                    text?: "<Message text>",
                    data?: "<Postback data>"
                },
                {
                    type: "<Action type (postback, message, uri)>",
                    label: "<Button label>",
                    text?: "<Message text>",
                    data?: "<Postback data>"
                }
            ]
        }
    }
})
```

### Template (carousel)
```js
lineClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
        type: "template",
        description: "<Message description>"
        template: {
            type: "carousel",
            columns: [
                {
                    thumbnailImageUrl: "<Image url (https)>",
                    title: "<Column title>",
                    text: "<Column text>",
                    actions: [
                        {
                            type: "<Action type (postback, message, uri)>",
                            label: "<Button label>",
                            text?: "<Message text>",
                            data?: "<Postback data>",
                            uri?: "<Http url>"
                        },
                        ...
                    ]
                },
                ..........
            ]
        }
    }
})
```