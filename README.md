Channel Integration
===========

# Install
Using npm
```sh
$ npm install --save https://github.com/RshengYoung/channel-integration.git
```

# Supports

| |Channel|
|:--|:--|
|![](https://camo.githubusercontent.com/41501247be1ca00650ac77731c02ef42297887b0/687474703a2f2f7777772e62726f69642e61692f646973742f6173736574732f696d616765732f6769746875622f696e746567726174696f6e732f6c696e652e706e67 | width=35)|[Line](https://github.com/RshengYoung/channel-integration/blob/master/src/line)|
|![](https://camo.githubusercontent.com/d8789cd5da99f5af0de0704608b079e67efddb29/687474703a2f2f7777772e62726f69642e61692f646973742f6173736574732f696d616765732f6769746875622f696e746567726174696f6e732f5765636861742e706e67 | width=35)|[Wechat](https://github.com/RshengYoung/channel-integration/blob/master/src/wechat)|

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