import { Parser } from '../interface'
import { IntegrationMessage, TextMessage, ImageMessage, VideoMessage, AudioMessage, TemplateMessage } from '../model'
export class LineParser implements Parser {
    constructor() { }

    format(integrationMessage: IntegrationMessage): Promise<Array<any>> {
        if (integrationMessage.message.length > 5)
            return Promise.reject("Error: The max length is 5")
        let lineMessages: Array<any> = []
        integrationMessage.message.forEach(message => {
            const messageType = message.type
            let lineMessage: any = { type: messageType }
            if (messageType === "text") {
                const textMessage = message as TextMessage
                lineMessage.text = textMessage.text
            } else if (messageType === "image") {
                const imageMessage = message as ImageMessage
                lineMessage.originalContentUrl = imageMessage.image
                lineMessage.previewImageUrl = imageMessage.image
            } else if (messageType === "video") {
                const videoMessage = message as VideoMessage
                lineMessage.originalContentUrl = videoMessage.video.videoUrl
                lineMessage.previewImageUrl = videoMessage.video.previewImage
            } else if (messageType === "audio") {
                const audioMessage = message as AudioMessage
                lineMessage.originalContentUrl = audioMessage.audio.audioUrl
                lineMessage.duration = audioMessage.audio.duration
            } else if (messageType === "template") {
                const templateMessage = message as TemplateMessage
                lineMessage.altText = templateMessage.description
                lineMessage.template = templateMessage.template
            } else
                return Promise.reject("Error: It doesn't support the message type.")
            lineMessages.push(lineMessage)
        })
        return Promise.resolve(lineMessages)
    }

}