"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_sdk_1 = require("@line/bot-sdk");
const interface_1 = require("../interface");
const parser_1 = require("./parser");
class LineClient extends interface_1.Adapter {
    constructor(config, serviceName) {
        super(config, serviceName || "line");
        this.client = new bot_sdk_1.Client({
            channelSecret: config.secret,
            channelAccessToken: config.accessToken
        });
        this.parser = new parser_1.LineParser();
    }
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const lineMessages = yield this.parser.format(message);
            return this.client.pushMessage(message.receiver, lineMessages)
                .then(() => Promise.resolve({ status: "ok" }))
                .catch(error => Promise.reject({ status: "error", message: error }));
        });
    }
}
exports.LineClient = LineClient;
