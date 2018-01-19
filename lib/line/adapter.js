"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_sdk_1 = require("@line/bot-sdk");
const interface_1 = require("../interface");
const parser_1 = require("./parser");
class LineClient extends interface_1.Adapter {
    constructor(config) {
        super(config);
        this.client = new bot_sdk_1.Client({
            channelSecret: config.secret,
            channelAccessToken: config.accessToken
        });
        this.parser = new parser_1.LineParser;
    }
    send(message) {
        return new Promise((resolve, reject) => {
            this.parser.format(message).then(lineMessages => {
                this.client.pushMessage(message.receiver, lineMessages).then(() => {
                    resolve({ status: "ok" });
                }).catch(err => {
                    reject({ status: "error", message: err });
                });
            }).catch(error => reject({ status: "error", message: error }));
        });
    }
    serviceName() {
        return "line";
    }
}
exports.LineClient = LineClient;
