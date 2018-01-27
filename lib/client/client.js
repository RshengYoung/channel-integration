"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Client {
    constructor(integrations) {
        this.integrations = integrations || [];
    }
    use(client) {
        this.integrations.push(client);
        return this;
    }
    send(message) {
        const clientIndex = this.integrations.map(client => client.getServiceName()).indexOf(message.channel);
        if (clientIndex < 0)
            return Promise.reject("Error: The channel doesn't be used.");
        return this.integrations[clientIndex].send(message);
    }
}
exports.Client = Client;
