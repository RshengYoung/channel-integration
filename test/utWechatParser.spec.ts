import { expect } from 'chai'
import 'mocha'

import { WechatParser } from '../src/wechat/parser'
import { Parser } from '../src/interface';
import { IntegrationMessage } from '../src/model';

describe("Wechat", () => {
    const parser: Parser = new WechatParser()

    it("Text Message format()", () => {
        const message: IntegrationMessage = {
            channel: "wechat",
            receiver: "oXFfsv1N3......",
            message: {
                type: "text",
                text: "Line Test Message"
            }
        }
        parser.format(message).then(wechatMessage => {
            expect(wechatMessage.touser).equal("oXFfsv1N3......")
            expect(wechatMessage.msgtype).equal("text")
            expect(wechatMessage.text.content).equal("Line Test Message")
        })
    })

    it("Image Message format()", () => {
        const message: IntegrationMessage = {
            channel: "wechat",
            receiver: "oXFfsv1N3......",
            message: {
                type: "image",
                image: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
            }
        }
        parser.format(message).then(wechatMessage => {
            expect(wechatMessage.touser).equal("oXFfsv1N3......")
            expect(wechatMessage.msgtype).equal("image")
            expect(wechatMessage.image.media_id).equal("https://storage.googleapis.com/paas-storage/3-2_dress.jpg")
        })
    })

    it("Video Message format()", () => {
        const message: IntegrationMessage = {
            channel: "wechat",
            receiver: "oXFfsv1N3......",
            message: {
                type: "video",
                video: {
                    videoUrl: "https://storage.googleapis.com/paas-storage/video/1-2_drink.mp4",
                    previewImage: "https://storage.googleapis.com/paas-storage/image/1-2_drink.jpg",
                    title: "Starbucks",
                    description: "Coffee"
                }
            }
        }
        parser.format(message).then(wechatMessage => {
            expect(wechatMessage.touser).equal("oXFfsv1N3......")
            expect(wechatMessage.msgtype).equal("video")
            expect(wechatMessage.video.media_id).equal("https://storage.googleapis.com/paas-storage/video/1-2_drink.mp4")
            expect(wechatMessage.video.thumb_media_id).equal("https://storage.googleapis.com/paas-storage/image/1-2_drink.jpg")
            expect(wechatMessage.video.title).equal("Starbucks")
            expect(wechatMessage.video.description).equal("Coffee")
        })
    })

    it("Audio Message format()", () => {
        const message: IntegrationMessage = {
            channel: "wechat",
            receiver: "oXFfsv1N3......",
            message: {
                type: "audio",
                audio: {
                    audioUrl: "https://storage.googleapis.com/paas-storage/mp3/1-2_drink.mp3",
                    duration: 2000
                }
            }
        }
        parser.format(message).then(wechatMessage => {
            expect(wechatMessage.touser).equal("oXFfsv1N3......")
            expect(wechatMessage.msgtype).equal("voice")
            expect(wechatMessage.voice.media_id).equal("https://storage.googleapis.com/paas-storage/mp3/1-2_drink.mp3")
        })
    })

})