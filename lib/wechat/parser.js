"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WechatParser {
    constructor() { }
    format(integrationMessage) {
        const messageType = integrationMessage.message.type.toLowerCase();
        let wechatMessage = {
            touser: integrationMessage.receiver,
            msgtype: messageType
        };
        if (messageType === "text") {
            const textMessage = integrationMessage.message;
            wechatMessage.text = { content: textMessage.text };
        }
        else if (messageType === "image") {
            const imageMessage = integrationMessage.message;
            wechatMessage.image = { media_id: imageMessage.image };
        }
        else if (messageType === "video") {
            const videoMessage = integrationMessage.message;
            wechatMessage.video = {
                media_id: videoMessage.video.videoUrl,
                thumb_media_id: videoMessage.video.previewImage,
                title: videoMessage.video.title,
                description: videoMessage.video.description
            };
        }
        else if (messageType === "audio") {
            const audioMessage = integrationMessage.message;
            wechatMessage.msgtype = "voice";
            wechatMessage.voice = { media_id: audioMessage.audio.audioUrl };
        }
        else
            return Promise.reject("Error: It doesn't support the message type.");
        return Promise.resolve(wechatMessage);
    }
}
exports.WechatParser = WechatParser;
