import { IntegrationMessage, Config } from './model'
// import { Message } from '@line/bot-sdk'

export abstract class Adapter {
    protected config: Config
    protected parser: Parser

    constructor(config: Config) {
        this.config = config
    }

    abstract send(message: IntegrationMessage): Promise<any>
    abstract serviceName(): string
}

export interface Parser {
    format(messge: IntegrationMessage): Promise<any>
}