import axios from 'axios'

import { Parser } from '../interface'
import { IntegrationMessage, TextMessage, ImageMessage, VideoMessage, AudioMessage, TemplateMessage } from '../model'
export class WechatParser implements Parser {
    constructor() { }

    async format(integrationMessage: IntegrationMessage): Promise<Array<any>> {
        let wechatMessages: Array<any> = []
        integrationMessage.message.forEach(message => {
            const messageType = message.type
            let wechatMessage: any = {
                touser: integrationMessage.receiver,
                msgtype: messageType
            }
            if (messageType === "text") {
                const textMessage = message as TextMessage
                wechatMessage.text = { content: textMessage.text }
            } else if (messageType === "image") {
                // await axios("/").then(res => {

                // })
            }
        })

        return Promise.resolve(wechatMessages)
    }
}