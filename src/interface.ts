import { IntegrationMessage, Config } from './model'
// import { Message } from '@line/bot-sdk'

export abstract class Adapter {
    protected config: Config
    protected parser: Parser
    protected serviceName: string

    constructor(config: Config, serviceName: string) {
        this.config = config
        this.serviceName = serviceName
    }

    abstract send(message: IntegrationMessage): Promise<any>
    // abstract serviceName(): string
    getServiceName(): string { return this.serviceName }
}

export interface Parser {
    format(messge: IntegrationMessage): Promise<any>
}