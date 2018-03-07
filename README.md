🔸Push Integration
===========

# Install
Using npm
```sh
$ npm install --save push-integration
```

# Supports

|⭐|Platform|
|:--:|:--|
|<img width="35" src="https://lh3.googleusercontent.com/l-ZZOFGyeKYz3stUbxTECHYnXcRD66C9g0tjiWA_okVIxZyb0E7_esU8LRpq_0LFCu8Y=w300">|[Line](https://github.com/RshengYoung/channel-integration/blob/master/src/line)|
|<img width="35" src="https://s3.amazonaws.com/ionic-marketplace/facebook-messenger-clone/icon.png">|[Messenger](https://github.com/RshengYoung/channel-integration/blob/master/src/messenger)|
|<img width="35" src="https://www.galaxymacau.com/uploads/media/pages/wechat/wechat.jpg">|[Wechat](https://github.com/RshengYoung/channel-integration/blob/master/src/wechat)|

# Example

## With JavaScript
```js
const bot = require("push-integration")

const lineClient = new bot.LineClient({
    id: "<Channel id>",
    secret: "<Channel secret>",
    token: "<Channel access token>"
}, "<Channel name>")
const clients = new bot.Client([lineClient])
```

## With TypeScript
```js
import * as bot from "push-integration"
const lineClient = new bot.LineClient({
    id: "<Channel id>",
    secret: "<Channel secret>",
    token: "<Channel access token>"
}, "<Channel name>")
const clients = new bot.Client([lineClient])
```
or
```js
import { Client, LineClient, WechatClient } from "push-integration"
const lineClient = new Client({
    id: "<Channel id>",
    secret: "<Channel secret>",
    token: "<Channel access token>"
}, "<Channel name>")
const clients = new Client([lineClient])
```

### Add new Channel
```js
const wechatClient = new WechatClient(CONFIG, "<Channel name>")
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
