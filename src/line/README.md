Line Client
===========

## Initialize
```js
const lineClient = new LineClient(CONFIG)
```

## Message types
|Text|Sticker|Location|Image|Audio|Video|Template|
|:--:|:-----:|:------:|:---:|:---:|:---:|:------:|
| ✅ |  ✅  |   ✅  | ✅  | ✅ | ✅  |   ✅   |

## Send text
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

## Send sticker
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

## Send location
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

## Send image
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


## Send audio
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
            previewImage: "<Preview image (https) (jpg)>",
            videoUrl: "<Video url (https) (mp4)>"
        }
    }
})
```

## Send template (buttons)
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

## Send template (confirm)
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

## Send template (carousel)
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