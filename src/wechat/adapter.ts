import axios from 'axios'
import * as Cache from 'node-cache'
import * as uuid from 'uuid'
import * as FormData from 'form-data'
import fetch from 'node-fetch'

import { Adapter } from '../interface'
import { Config, IntegrationMessage, ImageMessage, VideoMessage, AudioMessage } from '../model'
import { Buffer } from 'buffer'

export class WechatClient extends Adapter {
    private cache: Cache
    private wechatUrl: string = "https://api.weixin.qq.com/cgi-bin"
    private getTokenUrl: string = this.wechatUrl + "/token?"
    private sendMessageUrl = this.wechatUrl + "/message/custom/send?"
    private uploadMediaUrl = this.wechatUrl + "/media/upload?"

    constructor(config: Config) {
        super(config)
        this.cache = new Cache({ stdTTL: 7000, checkperiod: 0 })
    }

    async send(message: IntegrationMessage): Promise<any> {
        const formatToMedia = await this.formatUrltoMedia(message)
        const formatToWechat = await this.parser.format(formatToMedia)
        const accessToken = await this.getAccessToken()
        const url = `${this.sendMessageUrl}access_token=${accessToken}`
        return axios.post(url, formatToWechat)
            .then(() => Promise.resolve({ status: "ok" }))
            .catch(error => Promise.reject({ status: "error", message: error }))
    }

    serviceName(): string {
        return "wechat"
    }

    async uploadMedia(type: "image" | "voice" | "video" | "thumb", mediaUrl: string): Promise<string> {
        const split = mediaUrl.split(".")
        const fileType = split[split.length - 1]

        const mediaBuffer = await this.getBuffer(mediaUrl)
        const accessToken = await this.getAccessToken()
        const url = `${this.uploadMediaUrl}access_token=${accessToken}&type=${type}`
        const form = new FormData()
        form.append("media", mediaBuffer, {
            filename: `${uuid.v4()}.${fileType}`,
            knownLength: mediaBuffer.byteLength
        })
        return fetch(url, {
            method: "post",
            body: form,
            headers: form.getHeaders()//,
            // timeout: 100000
        }).then(res => {
            return res.json().then(result => {
                const mediaId = (result.media_id || result.thumb_media_id) as string
                // console.log("MediaId: ", mediaId)
                return Promise.resolve(mediaId)
            })
        })
    }

    private getAccessToken(): Promise<string> {
        const url = `${this.getTokenUrl}grant_type=client_credential&appid=${this.config.id}&secret=${this.config.secret}`
        const token = this.cache.get(this.config.id) as string
        if (token)
            return Promise.resolve(token as string)
        return axios.get(url).then(result => {
            const accessToken = result.data.access_token as string
            // console.log("Set token: ", accessToken)
            this.cache.set(this.config.id, accessToken)
            return Promise.resolve(accessToken)
        })
    }

    private getBuffer(media: string): Promise<Buffer> {
        return axios.get(media, { responseType: "arraybuffer" }).then(res => new Buffer(res.data))
    }

    private async formatUrltoMedia(integration: IntegrationMessage): Promise<IntegrationMessage> {
        const messageType = integration.message.type
        let format: any = integration
        if (messageType === "image") {
            const imageMessage = integration.message as ImageMessage
            format.message.image = await this.uploadMedia("image", imageMessage.image)
        } else if (messageType === "video") {
            const videoMessage = integration.message as VideoMessage
            format.message.video.previewImage = await this.uploadMedia("thumb", videoMessage.video.previewImage)
            format.message.video.videoUrl = await this.uploadMedia("video", videoMessage.video.videoUrl)
        } else if (messageType === "audio") {
            const audioMessage = integration.message as AudioMessage
            format.message.audio.audioUrl = await this.uploadMedia("voice", audioMessage.audio.audioUrl)
        }
        return Promise.resolve(format as IntegrationMessage)
    }

}