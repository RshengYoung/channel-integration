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
const uuid = require("uuid");
const FormData = require("form-data");
const node_fetch_1 = require("node-fetch");
const interface_1 = require("../interface");
const parser_1 = require("./parser");
const buffer_1 = require("buffer");
class WechatClient extends interface_1.Adapter {
    constructor(config) {
        super(config);
        this.wechatUrl = "https://api.weixin.qq.com/cgi-bin";
        this.getTokenUrl = this.wechatUrl + "/token?";
        this.sendMessageUrl = this.wechatUrl + "/message/custom/send?";
        this.uploadMediaUrl = this.wechatUrl + "/media/upload?";
        this.parser = new parser_1.WechatParser();
        this.cache = new Cache({ stdTTL: 7000, checkperiod: 0 });
    }
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const formatToMedia = yield this.formatUrltoMedia(message);
            const formatToWechat = yield this.parser.format(formatToMedia);
            const accessToken = yield this.getAccessToken();
            const url = `${this.sendMessageUrl}access_token=${accessToken}`;
            return axios_1.default.post(url, formatToWechat)
                .then(() => Promise.resolve({ status: "ok" }))
                .catch(error => Promise.reject({ status: "error", message: error }));
        });
    }
    serviceName() {
        return "wechat";
    }
    uploadMedia(type, mediaUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const split = mediaUrl.split(".");
            const fileType = split[split.length - 1];
            const mediaBuffer = yield this.getBuffer(mediaUrl);
            const accessToken = yield this.getAccessToken();
            const url = `${this.uploadMediaUrl}access_token=${accessToken}&type=${type}`;
            const form = new FormData();
            form.append("media", mediaBuffer, {
                filename: `${uuid.v4()}.${fileType}`,
                knownLength: mediaBuffer.byteLength
            });
            return node_fetch_1.default(url, {
                method: "post",
                body: form,
                headers: form.getHeaders() //,
                // timeout: 100000
            }).then(res => {
                return res.json().then(result => {
                    const mediaId = (result.media_id || result.thumb_media_id);
                    // console.log("MediaId: ", mediaId)
                    return Promise.resolve(mediaId);
                });
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
    formatUrltoMedia(integration) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageType = integration.message.type;
            const regex = new RegExp(/^http[s]?:\/\/[a-zA-Z0-9\-_\.\/]+$/);
            let format = integration;
            if (messageType === "image") {
                const imageMessage = integration.message;
                if (regex.test(imageMessage.image))
                    format.message.image = yield this.uploadMedia("image", imageMessage.image);
            }
            else if (messageType === "video") {
                const videoMessage = integration.message;
                if (regex.test(videoMessage.video.previewImage))
                    format.message.video.previewImage = yield this.uploadMedia("thumb", videoMessage.video.previewImage);
                if (regex.test(videoMessage.video.videoUrl))
                    format.message.video.videoUrl = yield this.uploadMedia("video", videoMessage.video.videoUrl);
            }
            else if (messageType === "audio") {
                const audioMessage = integration.message;
                if (regex.test(audioMessage.audio.audioUrl))
                    format.message.audio.audioUrl = yield this.uploadMedia("voice", audioMessage.audio.audioUrl);
            }
            return Promise.resolve(format);
        });
    }
}
exports.WechatClient = WechatClient;
