import axios from 'axios'
import * as Cache from 'node-cache'
import * as uuid from 'uuid'
import * as FormData from 'form-data'

import { Adapter } from '../interface'
import { Config, IntegrationMessage } from '../model'

export class WechatClient extends Adapter {
    private sessionId: string
    private cache: Cache
    private wechatUrl: string = "https://api.weixin.qq.com/cgi-bin"
    private getTokenUrl: string = this.wechatUrl + "/token?"
    private sendMessageUrl = this.wechatUrl + "/message/custom/send?"
    private uploadMediaUrl = this.wechatUrl + "/media/upload?"

    constructor(config: Config) {
        super(config)
        this.sessionId = uuid.v4()
        this.cache = new Cache({ stdTTL: 7000, checkperiod: 0 })
        this.getAccessToken()
    }

    send(message: IntegrationMessage): Promise<any> {
        return Promise.resolve()
    }

    serviceName(): string {
        return "wechat"
    }

    async uploadMedia(type: "image" | "voice" | "video" | "thumb", media: string/*Media URL*/): Promise<string> {
        const mediaBuffer = await this.getBuffer(media)
        const accessToken = await this.getAccessToken()
        const url = `${this.uploadMediaUrl}access_token=${accessToken}&type=${type}`
        console.log("URL: ", url)
        const form = new FormData()
        form.append("media", mediaBuffer, {
            filename: uuid.v4() + ".jpg",
            contentType: 'image/jpeg',
            knownLength: mediaBuffer.byteLength
        })
        return axios.post(url, form, {
            headers: form.getHeaders()
        }).then(res => {
            console.log(res.data)

            return res.data.media_id as string
        })
    }

    private getAccessToken(): Promise<string> {
        const url = `${this.getTokenUrl}grant_type=client_credential&appid=${this.config.id}&secret=${this.config.secret}`
        const token = this.cache.get(this.sessionId)
        if (token)
            return Promise.resolve(token as string)
        return axios.get(url).then(result => {
            const accessToken = result.data.access_token as string
            this.cache.set(this.sessionId, accessToken)
            return Promise.resolve(accessToken)
        })
    }

    private getBuffer(media: string): Promise<Buffer> {
        return axios.get(media, { responseType: "arraybuffer" }).then(buffer => Promise.resolve(buffer.data))
    }

}