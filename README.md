Channel Integration
===========

# Install
Using npm
```sh
$ npm install --save https://github.com/RshengYoung/channel-integration.git
```

# Example

## Wiht Javascript
```js
const bot = require("channel-integration")

const lineClient = new bot.Client(CONFIG)
const clients = new bot.Client([lineClient])
```

## Wiht Typescript
```ts
import * as bot from 'channel-integration'
const lineClient = new bot.Client(CONFIG)
const clients = new bot.Client([lineClient])
or

import { Client, LineClient, WechatClient } from 'channel-integration'
const lineClient = new Client(CONFIG)
const clients = new Client([lineClient])
```

### Add new channel
```ts
const wechatClient = new WechatClient(CONFIG)
clients.use(wechatClient)
```

### Send message
```ts
const message = {
    channel: "<Channel name>",
    receiver: "<User id>",
    message: [
        {
            type: "<Message type>",
            text: "Text1"
        }
    ]
}

clients.send(message)
    .then(result => {
        console.log(JSON.stringify(result, null, 4))
        /*
        {
            status: "ok"
        }
        */
    })
    .catch(error => {
        console.log(JSON.stringify(error, null, 4))
        /*
        {
            status: "error",
            message: "<Error message>"
        }
        */
    })
```