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
        else if (messageType === "news") {
            const newsMessage = integrationMessage.message;
            wechatMessage.news = { articles: [] };
            newsMessage.columns.forEach(column => {
                wechatMessage.news.articles.push({
                    title: column.title,
                    description: column.description,
                    url: column.url,
                    picurl: column.image
                });
            });
        }
        else
            return Promise.reject("Error: It doesn't support the message type.");
        // else if (messageType === "template") {
        //     const templateMessage = integrationMessage.message as TemplateMessage
        //     const buttonsMessage = templateMessage.template as TemplateCarousel
        //     wechatMessage.msgtype = "news"
        //     wechatMessage.news = { articles: [] }
        //     buttonsMessage.columns.forEach(column => {
        //         const actions = column.actions as URIAction[]
        //         wechatMessage.news.articles.push({
        //             title: column.title,
        //             description: column.text,
        //             url: actions[0].uri,
        //             picurl: column.thumbnailImageUrl
        //         })
        //     })
        // }
        return Promise.resolve(wechatMessage);
    }
}
exports.WechatParser = WechatParser;
