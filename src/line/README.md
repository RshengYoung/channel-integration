
Line Client
===========

## Initialize
```ts
const lineClient = new LineCient(CONFIG)
```

## Send text
```ts
lineClient.send({
    channel: "line",
    receiver: "<User id>",
    message: {
	type: "text",
        text: "Text Message"
    }
})
```

## Send sticker
```ts
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

## Send image
```ts
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
```ts
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
```ts
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
```ts
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
```ts
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
```ts
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