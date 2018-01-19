"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LineParser {
    constructor() { }
    format(integrationMessage) {
        if (integrationMessage.message.length > 5)
            return Promise.reject("Error: The max length is 5");
        let lineMessages = [];
        integrationMessage.message.forEach(message => {
            const messageType = message.type;
            let lineMessage = { type: messageType };
            if (messageType === "text") {
                const textMessage = message;
                lineMessage.text = textMessage.text;
            }
            else if (messageType === "image") {
                const imageMessage = message;
                lineMessage.originalContentUrl = imageMessage.image;
                lineMessage.previewImageUrl = imageMessage.image;
            }
            else if (messageType === "video") {
                const videoMessage = message;
                lineMessage.originalContentUrl = videoMessage.video.videoUrl;
                lineMessage.previewImageUrl = videoMessage.video.previewImage;
            }
            else if (messageType === "audio") {
                const audioMessage = message;
                lineMessage.originalContentUrl = audioMessage.audio.audioUrl;
                lineMessage.duration = audioMessage.audio.duration;
            }
            else if (messageType === "template") {
                const templateMessage = message;
                lineMessage.altText = templateMessage.description;
                lineMessage.template = templateMessage.template;
            }
            else
                return Promise.reject("Error: It doesn't support the message type.");
            lineMessages.push(lineMessage);
        });
        return Promise.resolve(lineMessages);
    }
}
exports.LineParser = LineParser;
