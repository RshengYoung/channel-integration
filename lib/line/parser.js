"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LineParser {
    constructor() { }
    format(integrationMessage) {
        const messageType = integrationMessage.message.type.toLowerCase();
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
        else if (messageType === "location") {
            const locationMessag = integrationMessage.message;
            lineMessage.title = locationMessag.location.title;
            lineMessage.address = locationMessag.location.address;
            lineMessage.latitude = locationMessag.location.latitude;
            lineMessage.longitude = locationMessag.location.longitude;
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
            // const templateMessage = integrationMessage.message as TemplateMessage
            // lineMessage.altText = templateMessage.description
            // lineMessage.template = templateMessage.template
            const templateMessage = integrationMessage.message;
            const templateType = templateMessage.template.type;
            lineMessage.altText = templateMessage.description;
            if (templateType === "button") {
                const templateButton = templateMessage.template;
                lineMessage.template = {
                    type: "buttons",
                    text: templateButton.content,
                    actions: this.addActions(templateButton.buttons),
                    title: templateButton.title,
                    thumbnailImageUrl: templateButton.image,
                    imageAspectRatio: templateButton.imageAspectRatio,
                    imageSize: templateButton.imageSize,
                    imageBackgroundColor: templateButton.imageBackgroundColor
                };
            }
            else if (templateType === "confirm") {
                const templateConfirm = templateMessage.template;
                lineMessage.template = {
                    type: "confirm",
                    text: templateConfirm.content,
                    actions: this.addActions(templateConfirm.buttons)
                };
            }
            else if (templateType === "carousel") {
                const templateCarousel = templateMessage.template;
                lineMessage.template = {
                    type: "carousel",
                    columns: []
                };
                templateCarousel.elements.forEach(column => {
                    lineMessage.template.columns.push({
                        thumbnailImageUrl: column.image,
                        imageBackgroundColor: column.imageBackgroundColor,
                        title: column.title,
                        text: column.content,
                        actions: this.addActions(column.buttons)
                    });
                });
            }
            else if (templateType === "imageCarousel") {
                const templateImageCarousel = templateMessage.template;
                lineMessage.template = {
                    type: "image_carousel",
                    columns: []
                };
                templateImageCarousel.elements.forEach(column => {
                    lineMessage.template.columns.push({
                        imageUrl: column.image,
                        action: this.addImageAction(column.action)
                    });
                });
            }
            else
                return Promise.reject("Error: It doesn't support the message type.");
        }
        else if (messageType === "imagemap") {
            const imageMapMessage = integrationMessage.message;
            lineMessage.baseUrl = imageMapMessage.imageMap.image;
            lineMessage.altText = imageMapMessage.imageMap.description;
            lineMessage.baseSize = { width: imageMapMessage.imageMap.width, height: imageMapMessage.imageMap.height };
            lineMessage.actions = imageMapMessage.imageMap.actions;
        }
        else
            return Promise.reject("Error: It doesn't support the message type.");
        return Promise.resolve(lineMessage);
    }
    addImageAction(button) {
        if (button.type === "url") {
            return {
                type: "uri",
                label: button.label,
                uri: button.url
            };
        }
        else if (button.type === "postback") {
            return {
                type: "postback",
                label: button.label,
                data: button.data,
                text: button.text
            };
        }
        else if (button.type === "message") {
            return {
                type: "message",
                label: button.label,
                text: button.text
            };
        }
        else if (button.type === "dateTime") {
            return {
                type: "datetimepicker",
                label: button.label,
                data: button.date,
                mode: button.mode,
                initial: button.initial,
                max: button.max,
                min: button.min
            };
        }
        else
            throw new Error("Error: It doesn't support the message type.");
    }
    addActions(buttons) {
        let actions = [];
        buttons.forEach(button => {
            if (button.type === "url") {
                actions.push({
                    type: "uri",
                    label: button.label,
                    uri: button.url
                });
            }
            else if (button.type === "postback") {
                actions.push({
                    type: "postback",
                    label: button.label,
                    data: button.data,
                    text: button.text
                });
            }
            else if (button.type === "message") {
                actions.push({
                    type: "message",
                    label: button.label,
                    text: button.text
                });
            }
            else if (button.type === "dateTime") {
                actions.push({
                    type: "datetimepicker",
                    label: button.label,
                    data: button.date,
                    mode: button.mode,
                    initial: button.initial,
                    max: button.max,
                    min: button.min
                });
            }
            else
                throw new Error("Error: It doesn't support the message type.");
        });
        return actions;
    }
}
exports.LineParser = LineParser;
