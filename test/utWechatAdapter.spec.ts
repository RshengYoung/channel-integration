import { expect } from 'chai'
import 'mocha'


import { WECHAT } from '../config'
import { WechatClient } from '../src/wechat/adapter'
import { Adapter } from '../src/interface';
import { IntegrationMessage } from '../src/model';

describe("Wechat", () => {
    const wechat = new WechatClient(WECHAT)

    it("Upload image media", async () => {
        await wechat.uploadMedia("image", "https://storage.googleapis.com/paas-storage/3-2_dress.jpg")
            .then(mediaId => {
                expect(mediaId).not.empty
                expect(mediaId).not.equal("")
            })
    })

    it("Upload voice media", async () => {
        await wechat.uploadMedia("voice", "https://storage.googleapis.com/paas-storage/mp3/1-2_drink.mp3")
            .then(mediaId => {
                expect(mediaId).not.empty
                expect(mediaId).not.equal("")
            })
    })

    it("Upload thumb media", async () => {
        await wechat.uploadMedia("thumb", "https://storage.googleapis.com/paas-storage/image/1-2_drink.jpg")
            .then(mediaId => {
                expect(mediaId).not.empty
                expect(mediaId).not.equal("")
            })
    })

    it("Upload video media", async () => {
        await wechat.uploadMedia("video", "https://storage.googleapis.com/paas-storage/video/1-2_drink.mp4")
            .then(mediaId => {
                expect(mediaId).not.empty
                expect(mediaId).not.equal("")
            })
    }).timeout(15000)

})