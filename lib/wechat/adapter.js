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
const Cache = require("node-cache");
const FormData = require("form-data");
const interface_1 = require("../interface");
const buffer_1 = require("buffer");
class WechatClient extends interface_1.Adapter {
    constructor(config) {
        super(config);
        this.wechatUrl = "https://api.weixin.qq.com/cgi-bin";
        this.getTokenUrl = this.wechatUrl + "/token?";
        this.sendMessageUrl = this.wechatUrl + "/message/custom/send?";
        this.uploadMediaUrl = this.wechatUrl + "/media/upload?";
        this.cache = new Cache({ stdTTL: 7000, checkperiod: 0 });
        this.getAccessToken();
    }
    send(message) {
        return Promise.resolve();
    }
    serviceName() {
        return "wechat";
    }
    uploadMedia(type, media /*Media URL*/) {
        return __awaiter(this, void 0, void 0, function* () {
            const mediaBuffer = yield this.getBuffer(media);
            const accessToken = yield this.getAccessToken();
            const url = `${this.uploadMediaUrl}access_token=${accessToken}&type=${type}`;
            const form = new FormData();
            form.append("media", mediaBuffer);
            return axios_1.default.post(url, form, {
                headers: { "Content-Type": "multipart/form-data" }
            }).then(res => {
                console.log(res.data);
                return res.data.media_id;
            });
        });
    }
    getAccessToken() {
        const url = `${this.getTokenUrl}grant_type=client_credential&appid=${this.config.id}&secret=${this.config.secret}`;
        const token = this.cache.get(this.config.id);
        if (token)
            return Promise.resolve(token);
        return axios_1.default.get(url).then(result => {
            const accessToken = result.data.access_token;
            this.cache.set(this.config.id, accessToken);
            return Promise.resolve(accessToken);
        });
    }
    getBuffer(media) {
        return axios_1.default.get(media, { responseType: "arraybuffer" }).then(res => new buffer_1.Buffer(res.data));
    }
}
exports.WechatClient = WechatClient;
