import axios from 'axios'
import * as Cache from 'node-cache'
import * as uuid from 'uuid'
import * as FormData from 'form-data'
import * as fs from 'fs'
import fetch from 'node-fetch'

import { Adapter } from '../interface'
import { Config, IntegrationMessage } from '../model'
import { Buffer } from 'buffer';

export class WechatClient extends Adapter {
    private cache: Cache
    private wechatUrl: string = "https://api.weixin.qq.com/cgi-bin"
    private getTokenUrl: string = this.wechatUrl + "/token?"
    private sendMessageUrl = this.wechatUrl + "/message/custom/send?"
    private uploadMediaUrl = this.wechatUrl + "/media/upload?"

    constructor(config: Config) {
        super(config)
        this.cache = new Cache({ stdTTL: 7000, checkperiod: 0 })
        this.getAccessToken()
    }

    send(message: IntegrationMessage): Promise<any> {
        return Promise.resolve()
    }

    serviceName(): string {
        return "wechat"
    }

    async uploadMedia(type: "image" | "voice" | "video" | "thumb", mediaUrl: string/*Media URL*/): Promise<string> {
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
            headers: form.getHeaders(),
            timeout: 100000
        }).then(res => {
            return res.json().then(result => {
                // console.log("result: ", result)
                const mediaId = (result.media_id || result.thumb_media_id) as string
                return Promise.resolve(mediaId)
            })
        })
    }

    private getAccessToken(): Promise<string> {
        return Promise.resolve("6_XtEoTexNZJoTHVqB5l5SjLuOBxNLGzq1etCss-a5TFNjs_tIKbkqlnbwH47V_X9RdyqUD5rwvsns8gcLV3XSJbMkhsa2yNhdv8t4OmQFTlNbLMAl7OCU9gPRXpa-0medBMQNP42vzr9S2Z_bHDAdAEAOKH")

        // const url = `${this.getTokenUrl}grant_type=client_credential&appid=${this.config.id}&secret=${this.config.secret}`
        // const token = this.cache.get(this.config.id)
        // if (token)
        //     return Promise.resolve(token as string)
        // return axios.get(url).then(result => {
        //     console.log("Set token")
        //     const accessToken = result.data.access_token as string
        //     this.cache.set(this.config.id, accessToken)
        //     return Promise.resolve(accessToken)
        // })
    }

    private getBuffer(media: string): Promise<Buffer> {
        return axios.get(media, { responseType: "arraybuffer" }).then(res => new Buffer(res.data))
    }

}