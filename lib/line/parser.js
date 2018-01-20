"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LineParser {
    constructor() { }
    format(integrationMessage) {
        const messageType = integrationMessage.message.type;
        let lineMessage = { type: messageType };
        if (messageType === "text") {
            const textMessage = integrationMessage.message;
            lineMessage.text = textMessage.text;
        }
        else if (messageType === "image") {
            const imageMessage = integrationMessage.message;
            lineMessage.originalContentUrl = imageMessage.image;
            lineMessage.previewImageUrl = imageMessage.image;
        }
        else if (messageType === "sticker") {
            const stickerMessage = integrationMessage.message;
            lineMessage.packageId = stickerMessage.sticker.packageId;
            lineMessage.stickerId = stickerMessage.sticker.stickerId;
        }
        else if (messageType === "video") {
            const videoMessage = integrationMessage.message;
            lineMessage.originalContentUrl = videoMessage.video.videoUrl;
            lineMessage.previewImageUrl = videoMessage.video.previewImage;
        }
        else if (messageType === "audio") {
            const audioMessage = integrationMessage.message;
            lineMessage.originalContentUrl = audioMessage.audio.audioUrl;
            lineMessage.duration = audioMessage.audio.duration;
        }
        else if (messageType === "template") {
            const templateMessage = integrationMessage.message;
            lineMessage.altText = templateMessage.description;
            lineMessage.template = templateMessage.template;
        }
        else
            return Promise.reject("Error: It doesn't support the message type.");
        return Promise.resolve(lineMessage);
    }
}
exports.LineParser = LineParser;
