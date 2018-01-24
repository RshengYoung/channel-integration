import axios from 'axios'

import { Adapter } from '../interface'
import { MessengerParser } from './parser'
import { Config, IntegrationMessage } from '../model'

export class MessengerClient extends Adapter {
    private sendMessageUrl: string = "https://graph.facebook.com/v2.6/me/messages?"

    constructor(config: Config) {
        super(config)
        this.parser = new MessengerParser()
    }

    async send(message: IntegrationMessage): Promise<any> {
        const messengerMessage = await this.parser.format(message)
        // console.log(JSON.stringify(messengerMessage, null, 4))
        return axios.post(`${this.sendMessageUrl}access_token=${this.config.accessToken}`, messengerMessage, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => Promise.resolve({ status: "ok" }))
            .catch(error => Promise.reject({ status: "error", message: error }))
    }

    serviceName(): string {
        return "messenger"
    }
}
