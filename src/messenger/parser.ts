
import { Parser } from '../interface'
import { IntegrationMessage, TextMessage, ImageMessage, AudioMessage, VideoMessage, FileMessage, TemplateMessage, TemplateButton, Button, TemplateCarousel, QuickReplyMessage } from '../model';

export class MessengerParser implements Parser {
    constructor() { }

    format(integrationMessage: IntegrationMessage): Promise<any> {
        const messageType = integrationMessage.message.type.toLowerCase()
        let messengerMessage: any = {
            recipient: { id: integrationMessage.receiver },
            message: {}
        }
        if (messageType === "text") {
            const textMessage = integrationMessage.message as TextMessage
            messengerMessage.message = { text: textMessage.text }
        } else if (messageType === "image") {
            const imageMessage = integrationMessage.message as ImageMessage
            messengerMessage.message = {
                attachment: {
                    type: "image",
                    payload: { url: imageMessage.image }
                }
            }
        } else if (messageType === "audio") {
            const audioMessage = integrationMessage.message as AudioMessage
            messengerMessage.message = {
                attachment: {
                    type: "audio",
                    payload: { url: audioMessage.audio.audioUrl }
                }
            }
        } else if (messageType === "video") {
            const videoMessage = integrationMessage.message as VideoMessage
            messengerMessage.message = {
                attachment: {
                    type: "video",
                    payload: { url: videoMessage.video.videoUrl }
                }
            }
        } else if (messageType === "file") {
            const fileMessage = integrationMessage.message as FileMessage
            messengerMessage.message = {
                attachment: {
                    type: "file",
                    payload: { url: fileMessage.file }
                }
            }
        } else if (messageType === "quickreply") {
            const quickReplyMessage = integrationMessage.message as QuickReplyMessage
            messengerMessage.message = {
                text: quickReplyMessage.title,
                quick_replies: []
            }
            quickReplyMessage.elements.forEach(element => {
                messengerMessage.message.quick_replies.push({
                    content_type: element.type,
                    title: element.label,
                    payload: element.data
                })
            })
        } else if (messageType === "template") {
            const templateMessage = integrationMessage.message as TemplateMessage
            const templateType = templateMessage.template.type
            messengerMessage.message = {
                attachment: {
                    type: "template",
                    payload: {}
                }
            }
            if (templateType === "button") {
                const templateButton = templateMessage.template as TemplateButton
                messengerMessage.message.attachment.payload = {
                    template_type: "button",
                    text: templateButton.content,
                    buttons: this.addButtons(templateButton.buttons)
                }
            } else if (templateType === "carousel") {
                const templateCarousel = templateMessage.template as TemplateCarousel
                messengerMessage.message.attachment.payload = {
                    template_type: "generic",
                    elements: []
                }
                templateCarousel.elements.forEach(element => {
                    messengerMessage.message.attachment.payload.elements.push({
                        title: element.title,
                        subtitle: element.content,
                        item_url: element.url,
                        image_url: element.image,
                        buttons: this.addButtons(element.buttons)
                    })
                })
            } else
                return Promise.reject("Error: It doesn't support the message type.")
        } else
            return Promise.reject("Error: It doesn't support the message type.")
        return Promise.resolve(messengerMessage)
    }

    private addButtons(buttons: Button<{ label: string }>[]): Array<any> {
        let actions: Array<any> = []
        buttons.forEach(button => {
            if (button.type === "url") {
                actions.push({
                    type: "web_url",
                    url: button.url,
                    title: button.label
                })
            } else if (button.type === "postback") {
                actions.push({
                    type: "postback",
                    payload: button.data,
                    title: button.label
                })
            } else if (button.type === "phoneNumber") {
                actions.push({
                    type: "phone_number",
                    title: button.label,
                    payload: button.phone
                })
            } else if (button.type === "accountLink") {
                actions.push({
                    type: "account_link",
                    title: button.label,
                    url: button.url
                })
            } else
                throw new Error("Error: It doesn't support the message type.")
        })
        return actions
    }
}