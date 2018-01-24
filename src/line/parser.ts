import { Parser } from '../interface'
import { IntegrationMessage, TextMessage, ImageMessage, VideoMessage, AudioMessage, TemplateMessage, StickerMessage, LocationMessage, ImageMapMessage, TemplateButton, TemplateConfirm, Button, TemplateCarousel, TemplateImageCarousel } from '../model'
import { Action } from '@line/bot-sdk'

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
            // const templateMessage = integrationMessage.message as TemplateMessage
            // lineMessage.altText = templateMessage.description
            // lineMessage.template = templateMessage.template
            const templateMessage = integrationMessage.message as TemplateMessage
            const templateType = templateMessage.template.type
            lineMessage.altText = templateMessage.description
            if (templateType === "button") {
                const templateButton = templateMessage.template as TemplateButton
                lineMessage.template = {
                    type: "buttons",
                    text: templateButton.content,
                    actions: this.addActions(templateButton.buttons),
                    title: templateButton.title,        //------ or undefined
                    thumbnailImageUrl: templateButton.image,
                    imageAspectRatio: templateButton.imageAspectRatio,
                    imageSize: templateButton.imageSize,
                    imageBackgroundColor: templateButton.imageBackgroundColor
                }
            } else if (templateType === "confirm") {
                const templateConfirm = templateMessage.template as TemplateConfirm
                lineMessage.template = {
                    type: "confirm",
                    text: templateConfirm.content,
                    actions: this.addActions(templateConfirm.buttons)
                }
            } else if (templateType === "carousel") {
                const templateCarousel = templateMessage.template as TemplateCarousel
                lineMessage.template = {
                    type: "carousel",
                    columns: []
                }
                templateCarousel.elements.forEach(column => {
                    lineMessage.template.columns.push({
                        thumbnailImageUrl: column.image,
                        imageBackgroundColor: column.imageBackgroundColor,
                        title: column.title,
                        text: column.content,
                        actions: this.addActions(column.buttons)
                    })
                })
            } else if (templateType === "imageCarousel") {
                const templateImageCarousel = templateMessage.template as TemplateImageCarousel
                lineMessage.template = {
                    type: "image_carousel",
                    columns: []
                }
                templateImageCarousel.elements.forEach(column => {
                    lineMessage.template.columns.push({
                        imageUrl: column.image,
                        action: this.addImageAction(column.action)
                    })
                })
            } else
                return Promise.reject("Error: It doesn't support the message type.")
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

    private addImageAction(button: Button<{ label?: string }>): Action<{ label?: string }> {
        if (button.type === "url") {
            return {
                type: "uri",
                label: button.label,
                uri: button.url
            }
        } else if (button.type === "postback") {
            return {
                type: "postback",
                label: button.label,
                data: button.data,
                text: button.text
            }
        } else if (button.type === "message") {
            return {
                type: "message",
                label: button.label,
                text: button.text
            }
        } else if (button.type === "dateTime") {
            return {
                type: "datetimepicker",
                label: button.label,
                data: button.date,
                mode: button.mode,
                initial: button.initial,
                max: button.max,
                min: button.min
            }
        } else
            throw new Error("Error: It doesn't support the message type.")
    }

    private addActions(buttons: Button<{ label: string }>[]): Action<{ label: string }>[] {
        let actions: Action<{ label: string }>[] = []
        buttons.forEach(button => {
            if (button.type === "url") {
                actions.push({
                    type: "uri",
                    label: button.label,
                    uri: button.url
                })
            } else if (button.type === "postback") {
                actions.push({
                    type: "postback",
                    label: button.label,
                    data: button.data,
                    text: button.text
                })
            } else if (button.type === "message") {
                actions.push({
                    type: "message",
                    label: button.label,
                    text: button.text
                })
            } else if (button.type === "dateTime") {
                actions.push({
                    type: "datetimepicker",
                    label: button.label,
                    data: button.date,
                    mode: button.mode,
                    initial: button.initial,
                    max: button.max,
                    min: button.min
                })
            } else
                throw new Error("Error: It doesn't support the message type.")
        })
        return actions
    }

}