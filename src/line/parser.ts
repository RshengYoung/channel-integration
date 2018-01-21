import { Parser } from '../interface'
import { IntegrationMessage, TextMessage, ImageMessage, VideoMessage, AudioMessage, TemplateMessage, StickerMessage, LocationMessage, ImageMapMessage } from '../model'
export class LineParser implements Parser {
    constructor() { }

    format(integrationMessage: IntegrationMessage): Promise<any> {
        const messageType = integrationMessage.message.type.toLowerCase()
        let lineMessage: any = { type: messageType }
        if (messageType === "text") {
            const textMessage = integrationMessage.message as TextMessage
            lineMessage.text = textMessage.text
        } else if (messageType === "image") {
            const imageMessage = integrationMessage.message as ImageMessage
            lineMessage.originalContentUrl = imageMessage.image
            lineMessage.previewImageUrl = imageMessage.image
        } else if (messageType === "sticker") {
            const stickerMessage = integrationMessage.message as StickerMessage
            lineMessage.packageId = stickerMessage.sticker.packageId
            lineMessage.stickerId = stickerMessage.sticker.stickerId
        } else if (messageType === "location") {
            const locationMessag = integrationMessage.message as LocationMessage
            lineMessage.title = locationMessag.location.title
            lineMessage.address = locationMessag.location.address
            lineMessage.latitude = locationMessag.location.latitude
            lineMessage.longitude = locationMessag.location.longitude
        } else if (messageType === "video") {
            const videoMessage = integrationMessage.message as VideoMessage
            lineMessage.originalContentUrl = videoMessage.video.videoUrl
            lineMessage.previewImageUrl = videoMessage.video.previewImage
        } else if (messageType === "audio") {
            const audioMessage = integrationMessage.message as AudioMessage
            lineMessage.originalContentUrl = audioMessage.audio.audioUrl
            lineMessage.duration = audioMessage.audio.duration
        } else if (messageType === "template") {
            const templateMessage = integrationMessage.message as TemplateMessage
            lineMessage.altText = templateMessage.description
            lineMessage.template = templateMessage.template
        } else if (messageType === "imagemap") {
            const imageMapMessage = integrationMessage.message as ImageMapMessage
            lineMessage.baseUrl = imageMapMessage.imageMap.image
            lineMessage.altText = imageMapMessage.imageMap.description
            lineMessage.baseSize = { width: imageMapMessage.imageMap.width, height: imageMapMessage.imageMap.height }
            lineMessage.actions = imageMapMessage.imageMap.actions
        } else
            return Promise.reject("Error: It doesn't support the message type.")
        return Promise.resolve(lineMessage)
    }

}