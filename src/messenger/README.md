🔸Messenger Client
===========

## Initialize
```js
const messengerClient = new messengerClient(CONFIG)
```

## Message Types
|Text|Sticker|Location|Image|Audio|Video|Template|ImageMap|News|
|:--:|:-----:|:------:|:---:|:---:|:---:|:------:|:------:|:--:|
| ✅ |  ❌  |   ❌  | ✅  | ✅ | ✅  |   ✅   |  ❌   | ❌|

## Send Message

### Text
```js
messengerClient.send({
    channel: "messenger",
    receiver: "<User id>",
    message: {
	type: "text",
        text: "<Message text>"
    }
})
```

### Image
```js
messengerClient.send({
    channel: "messenger",
    receiver: "<User id>",
    message: {
        type: "image",
        image: "<Image url (https)>"
    }
})
```


### Audio
```js
messengerClient.send({
    channel: "messenger",
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
messengerClient.send({
    channel: "messenger",
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
messengerClient.send({
    channel: "messenger",
    receiver: "<User id>",
    message: {
        type: "template",
        description: "<Message description>"
        template: {
            type: "buttons",
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

### Template (carousel)
```js
messengerClient.send({
    channel: "messenger",
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