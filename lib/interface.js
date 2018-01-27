"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Message } from '@line/bot-sdk'
class Adapter {
    constructor(config, serviceName) {
        this.config = config;
        this.serviceName = serviceName;
    }
    // abstract serviceName(): string
    getServiceName() { return this.serviceName; }
}
exports.Adapter = Adapter;
