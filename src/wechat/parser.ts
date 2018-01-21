import axios from 'axios'

import { Parser } from '../interface'
import { IntegrationMessage, TextMessage, ImageMessage, VideoMessage, AudioMessage, TemplateMessage, NewsMessage } from '../model'
import { TemplateButtons, TemplateCarousel, URIAction } from '@line/bot-sdk';
export class WechatParser implements Parser {
    constructor() { }

    format(integrationMessage: IntegrationMessage): Promise<any> {
        const messageType = integrationMessage.message.type.toLowerCase()
        let wechatMessage: any = {
            touser: integrationMessage.receiver,
            msgtype: messageType
        }
        if (messageType === "text") {
            const textMessage = integrationMessage.message as TextMessage
            wechatMessage.text = { content: textMessage.text }
        } else if (messageType === "image") {
            const imageMessage = integrationMessage.message as ImageMessage
            wechatMessage.image = { media_id: imageMessage.image }
        } else if (messageType === "video") {
            const videoMessage = integrationMessage.message as VideoMessage
            wechatMessage.video = {
                media_id: videoMessage.video.videoUrl,
                thumb_media_id: videoMessage.video.previewImage,
                title: videoMessage.video.title,
                description: videoMessage.video.description
            }
        } else if (messageType === "audio") {
            const audioMessage = integrationMessage.message as AudioMessage
            wechatMessage.msgtype = "voice"
            wechatMessage.voice = { media_id: audioMessage.audio.audioUrl }
        } else if (messageType === "news") {
            const newsMessage = integrationMessage.message as NewsMessage
            wechatMessage.news = { articles: [] }
            newsMessage.columns.forEach(column => {
                wechatMessage.news.articles.push({
                    title: column.title,
                    description: column.description,
                    url: column.url,
                    picurl: column.image
                })
            })
        } else
            return Promise.reject("Error: It doesn't support the message type.")

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
        return Promise.resolve(wechatMessage)
    }
}