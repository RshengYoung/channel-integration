import { expect } from 'chai'
import 'mocha'


import { WECHAT } from '../config'
import { WechatClient } from '../src/wechat/adapter'
import { Adapter } from '../src/interface';
import { IntegrationMessage } from '../src/model';

describe("Wechat", () => {
    const wechat = new WechatClient(WECHAT)

    it("Upload media", async() => {
        await wechat.uploadMedia("image", "https://storage.googleapis.com/paas-storage/3-2_dress.jpg").then(mediaId => {
            console.log(mediaId)
        })
    })


})