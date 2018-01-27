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
const axios_1 = require("axios");
const interface_1 = require("../interface");
const parser_1 = require("./parser");
class MessengerClient extends interface_1.Adapter {
    constructor(config, serviceName) {
        super(config, serviceName || "messenger");
        this.sendMessageUrl = "https://graph.facebook.com/v2.6/me/messages?";
        this.parser = new parser_1.MessengerParser();
    }
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const messengerMessage = yield this.parser.format(message);
            // console.log(JSON.stringify(messengerMessage, null, 4))
            return axios_1.default.post(`${this.sendMessageUrl}access_token=${this.config.accessToken}`, messengerMessage, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(() => Promise.resolve({ status: "ok" }))
                .catch(error => Promise.reject({ status: "error", message: error }));
        });
    }
}
exports.MessengerClient = MessengerClient;
