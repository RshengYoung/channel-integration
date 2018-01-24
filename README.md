🔸Push Integration
===========

# Install
Using npm
```sh
$ npm install --save https://github.com/RshengYoung/channel-integration.git
```

# Supports

|⭐|Platform|
|:--:|:--|
|<img width="35" src="http://www.broid.ai/dist/assets/images/github/integrations/line.png">|[Line](https://github.com/RshengYoung/channel-integration/blob/master/src/line)|
|<img width="35" src="http://www.broid.ai/dist/assets/images/github/integrations/messenger.png">|[Messenger](https://github.com/RshengYoung/channel-integration/blob/master/src/messenger)|
|<img width="35" src="http://www.broid.ai/dist/assets/images/github/integrations/Wechat.png">|[Wechat](https://github.com/RshengYoung/channel-integration/blob/master/src/wechat)|

# Example

## With JavaScript
```js
const bot = require("push-integration")

const lineClient = new bot.Client({
    id: "<Channel id>",
    secret: "<Channel secret>",
    token: "<Channel access token>"
})
const clients = new bot.Client([lineClient])
```

## With TypeScript
```js
import * as bot from 'push-integration'
const lineClient = new bot.Client({
    id: "<Channel id>",
    secret: "<Channel secret>",
    token: "<Channel access token>"
})
const clients = new bot.Client([lineClient])
```
or
```js
import { Client, LineClient, WechatClient } from "push-integration"
const lineClient = new Client({
    id: "<Channel id>",
    secret: "<Channel secret>",
    token: "<Channel access token>"
})
const clients = new Client([lineClient])
```

### Add new Channel
```js
const wechatClient = new WechatClient(CONFIG)
clients.use(wechatClient)
```

### Send Message
```js
const message = {
    channel: "<Channel name>",
    receiver: "<User id>",
    message: {
        type: "<Message type>",
        ...<Message object>
    }
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