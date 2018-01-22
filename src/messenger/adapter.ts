
import { Adapter } from '../interface'
import { } from './parser'
import { Config, IntegrationMessage } from '../model'

export class MessengerClient extends Adapter {

    constructor(config: Config) {
        super(config)
    }

    send(message: IntegrationMessage): Promise<any> { 
        return Promise.resolve()
    }
    serviceName(): string {
        return "messenger"
    }
}
