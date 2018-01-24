import { Client } from '@line/bot-sdk'

import { Adapter } from '../interface'
import { LineParser } from './parser'
import { Config, IntegrationMessage } from '../model'

export class LineClient extends Adapter {
    private client: Client
    constructor(config: Config) {
        super(config)
        this.client = new Client({
            channelSecret: config.secret,
            channelAccessToken: config.accessToken
        })
        this.parser = new LineParser()
    }

    async send(message: IntegrationMessage): Promise<any> {
        const lineMessages = await this.parser.format(message)
        return this.client.pushMessage(message.receiver, lineMessages)
            .then(() => Promise.resolve({ status: "ok" }))
            .catch(error => Promise.reject({ status: "error", message: error }))
    }

    serviceName(): string {
        return "line"
    }
}