"use strict";
exports.__esModule = true;
var Client = /** @class */ (function () {
    function Client(integrations) {
        this.integrations = integrations || [];
    }
    Client.prototype.use = function (client) {
        this.integrations.push(client);
        return this;
    };
    Client.prototype.send = function (message) {
        var clientIndex = this.integrations.map(function (client) { return client.serviceName(); }).indexOf(message.channel);
        if (clientIndex < 0)
            return Promise.reject("Error: The channel doesn't be used.");
        return this.integrations[clientIndex].send(message);
    };
    return Client;
}());
exports.Client = Client;
