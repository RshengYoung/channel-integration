Channel Integration
===========

# Install
Using npm
```sh
$ npm install --save https://github.com/RshengYoung/channel-integration.git
```

# Supports
* [Line](https://github.com/RshengYoung/channel-integration/blob/master/src/line)
* [Wechat](https://github.com/RshengYoung/channel-integration/blob/master/src/wechat)

# Example

## With Javascript
```js
const bot = require("channel-integration")

const lineClient = new bot.Client({
    id: "<Channel id>",
    secret: "<Channel secret>",
    token: "<Channel access token>"
})
const clients = new bot.Client([lineClient])
```

## With Typescript
```ts
import * as bot from 'channel-integration'
const lineClient = new bot.Client({
    id: "<Channel id>",
    secret: "<Channel secret>",
    token: "<Channel access token>"
})
const clients = new bot.Client([lineClient])
```
or
```ts
import { Client, LineClient, WechatClient } from "channel-integration"
const lineClient = new Client({
    id: "<Channel id>",
    secret: "<Channel secret>",
    token: "<Channel access token>"
})
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
            ...<Message object>
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