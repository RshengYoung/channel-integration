"use strict";
exports.__esModule = true;
var LineParser = /** @class */ (function () {
    function LineParser() {
    }
    LineParser.prototype.format = function (integrationMessage) {
        if (integrationMessage.message.length > 5)
            return Promise.reject("Error: The max length is 5");
        var lineMessages = [];
        integrationMessage.message.forEach(function (message) {
            var messageType = message.type;
            var lineMessage = { type: messageType };
            if (messageType === "text") {
                var textMessage = message;
                lineMessage.text = textMessage.text;
            }
            else if (messageType === "image") {
                var imageMessage = message;
                lineMessage.originalContentUrl = imageMessage.image;
                lineMessage.previewImageUrl = imageMessage.image;
            }
            else if (messageType === "video") {
                var videoMessage = message;
                lineMessage.originalContentUrl = videoMessage.video.videoUrl;
                lineMessage.previewImageUrl = videoMessage.video.previewImage;
            }
            else if (messageType === "audio") {
                var audioMessage = message;
                lineMessage.originalContentUrl = audioMessage.audio.audioUrl;
                lineMessage.duration = audioMessage.audio.duration;
            }
            else if (messageType === "template") {
                var templateMessage = message;
                lineMessage.altText = templateMessage.description;
                lineMessage.template = templateMessage.template;
            }
            else
                return Promise.reject("Error: It doesn't support the message type.");
            lineMessages.push(lineMessage);
        });
        return Promise.resolve(lineMessages);
    };
    return LineParser;
}());
exports.LineParser = LineParser;
