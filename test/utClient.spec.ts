import { expect } from 'chai'
import 'mocha'

import { Client } from '../src/client/client'
import { LineClient } from '../src/line/adapter'
import { Parser, Adapter } from '../src/interface';
import { IntegrationMessage } from '../src/model';
import { LINE, WECHAT } from '../config'
import { WechatClient } from '../src/wechat/adapter';

describe("Client", () => {
    const line: Adapter = new LineClient(LINE)
    const wechat: Adapter = new WechatClient(WECHAT)
    const client: Client = new Client([line, wechat])

    it("Client send Line message", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: {
                type: "text",
                text: "Text1"
            }
        }
        const result = await client.send(message)
        expect(result.status).equal("ok")
    })

    it("Client send Wechat message", async () => {
        const message: IntegrationMessage = {
            channel: "wechat",
            receiver: "oXFfsv1N3Rfa5Cj0glsZTWUEjpYQ",
            message: {
                type: "text",
                text: "Wechat Message"
            }
        }
        const result = await client.send(message)
        expect(result.status).equal("ok")
    })

})