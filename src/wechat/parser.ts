import axios from 'axios'

import { Parser } from '../interface'
import { IntegrationMessage, TextMessage, ImageMessage, VideoMessage, AudioMessage, TemplateMessage } from '../model'
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
        } else
            return Promise.reject("Error: It doesn't support the message type.")
        return Promise.resolve(wechatMessage)
    }
}