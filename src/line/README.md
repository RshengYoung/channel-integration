🔸Line Client
===========

## Initialize
```js
const lineClient = new LineClient(CONFIG, "line")
```

## Message Types
|Text|Sticker|Location|Image|Audio|Video|Template|ImageMap|
|:--:|:-----:|:------:|:---:|:---:|:---:|:------:|:------:|
| ✅ |  ✅  |   ✅  | ✅  | ✅ | ✅  |   ✅   |  ✅   |

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
            type: "button",
            image: "<Image url (https)>",
            title: "<Template title>",
            content: "<Template text>",
            buttons: [
                {
                    type: "<Action type (postback, message, url)>",
                    label: "<Button label>",
                    text?: "<Message text>",
                    data?: "<Postback data>",
                    url?: "<Http url>"
                },
                ...<Max: 4>
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
            content: "<Template description>",
            buttons: [  //  Must set 2 buttons
                {
                    type: "<Action type (postback, message)>",
                    label: "<Button label>",
                    text?: "<Message text>",
                    data?: "<Postback data>"
                },
                {
                    type: "<Action type (postback, message)>",
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
            elements: [
                {
                    image: "<Image url (https)>",
                    title: "<Column title>",
                    content: "<Column text>",
                    buttons: [
                        {
                            type: "<Action type (postback, message, url)>",
                            label: "<Button label>",
                            text?: "<Message text>",
                            data?: "<Postback data>",
                            url?: "<Http url>"
                        },
                        ...<Max: 3>
                    ]
                },
                ...<Max: 10>
            ]
        }
    }
})
```

### ImageMap
```js
lineClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
        type: "imageMap",
        imageMap: {
            image: "https://storage.googleapis.com/paas-storage/coupons",
            description: "My Product",
            width: <Image width (Max: 1040)>,
            height: <Image height (Max: 1040)>,
            actions: [
                {
                    type: "<Action type (uri, message)>",
                    text?: "<Message text>",
                    linkUri?: "<Http/Https url>"
                    area: { x: <Location X>, y: <Location Y>, width: <Width>, height: <Height> }
                },
                ...<Max: 50>
            ]
        }
    }
})
```