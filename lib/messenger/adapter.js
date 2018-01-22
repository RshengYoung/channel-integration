"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = require("../interface");
class MessengerClient extends interface_1.Adapter {
    constructor(config) {
        super(config);
    }
    send(message) {
        return Promise.resolve();
    }
    serviceName() {
        return "messenger";
    }
}
exports.MessengerClient = MessengerClient;
