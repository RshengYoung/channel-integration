import { Client } from '@line/bot-sdk'

import { Adapter } from '../interface'
import { Config, IntegrationMessage } from '../model'
import { LineParser } from './parser'

export class LineClient extends Adapter {
    private client: Client
    constructor(config: Config) {
        super(config)
        this.client = new Client({
            channelSecret: config.secret,
            channelAccessToken: config.accessToken
        })
        this.parser = new LineParser
    }

    send(message: IntegrationMessage): Promise<any> {
        return new Promise((resolve, reject) => {
            this.parser.format(message).then(lineMessages => {
                this.client.pushMessage(message.receiver, lineMessages).then(() => {
                    resolve({ status: "ok" })
                }).catch(err => {
                    reject({ status: "error", message: err })
                })
            }).catch(error => reject({ status: "error", message: error }))
        })
    }

    serviceName(): string {
        return "line"
    }
}