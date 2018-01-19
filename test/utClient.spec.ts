import { expect } from 'chai'
import 'mocha'

import { Client } from '../src/client/client'
import { LineClient } from '../src/line/adapter'
import { Parser, Adapter } from '../src/interface';
import { IntegrationMessage } from '../src/model';
import { LINE } from '../config'

describe("Client", () => {
    const line: Adapter = new LineClient(LINE)
    const client: Client = new Client([line])

    it("Client send message", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: [
                {
                    type: "text",
                    text: "Text1"
                }
            ]
        }
        await client.send(message).then(response => {
            expect(response.status).equal("ok")
        })
    })
})