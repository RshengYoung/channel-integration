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

    it("Send text", async () => {
        const message: IntegrationMessage = {
            channel: "wechat",
            receiver: "oXFfsv1N3Rfa5Cj0glsZTWUEjpYQ",
            message: {
                type: "text",
                text: "Text Message"
            }
        }
        await wechat.send(message).then(response => {
            expect(response.status).equal("ok")
        })
    })

    it("Send image", async () => {
        const message: IntegrationMessage = {
            channel: "wechat",
            receiver: "oXFfsv1N3Rfa5Cj0glsZTWUEjpYQ",
            message: {
                type: "image",
                image: "rcGf2DhGKhbVO6A9rN8zscCIvrXU3qGK7sRSFhLAWHoCYEXdsGYggR6ff5N9GZVW"//"https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
            }
        }
        await wechat.send(message).then(response => {
            expect(response.status).equal("ok")
        })
    })

    it("Send video", async () => {
        const message: IntegrationMessage = {
            channel: "wechat",
            receiver: "oXFfsv1N3Rfa5Cj0glsZTWUEjpYQ",
            message: {
                type: "video",
                video: {
                    title: "Video Test",
                    description: "Video Description",
                    previewImage: "https://storage.googleapis.com/paas-storage/image/1-2_drink.jpg",
                    videoUrl: "https://storage.googleapis.com/paas-storage/video/1-2_drink.mp4"
                }
            }
        }
        await wechat.send(message).then(response => {
            expect(response.status).equal("ok")
        })
    }).timeout(15000)

    it("Send audio", async () => {
        const message: IntegrationMessage = {
            channel: "wechat",
            receiver: "oXFfsv1N3Rfa5Cj0glsZTWUEjpYQ",
            message: {
                type: "audio",
                audio: {
                    audioUrl: "https://storage.googleapis.com/paas-storage/mp3/1-2_drink.mp3",
                    duration: 2000
                }
            }
        }
        await wechat.send(message).then(response => {
            expect(response.status).equal("ok")
        })
    })

})