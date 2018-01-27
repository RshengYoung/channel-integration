import { Adapter } from '../interface'
import { IntegrationMessage } from '../model';

export class Client {
    private integrations: Adapter[]

    constructor(integrations?: Adapter[]) {
        this.integrations = integrations || []
    }

    use(client: Adapter): Client {
        this.integrations.push(client)
        return this
    }

    send(message: IntegrationMessage): Promise<any> {
        const clientIndex = this.integrations.map(client => client.getServiceName()).indexOf(message.channel.toLowerCase())
        if (clientIndex < 0)
            return Promise.reject("Error: The channel doesn't be used.")
        return this.integrations[clientIndex].send(message)
    }
}