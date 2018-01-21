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

    it("Template(news) Message format()", () => {
        const message: IntegrationMessage = {
            channel: "wechat",
            receiver: "oXFfsv1N3......",
            message: {
                type: "template",
                description: "Description",
                template: {
                    type: "carousel",
                    columns: [
                        {
                            thumbnailImageUrl: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
                            title: "Title1",
                            text: "Text1",
                            actions: [{
                                type: "uri",
                                label: "Label",
                                uri: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
                            }]
                        },
                        {
                            thumbnailImageUrl: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
                            title: "Title2",
                            text: "Text2",
                            actions: [{
                                type: "uri",
                                label: "Label",
                                uri: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
                            }]
                        }
                    ]
                }
            }
        }

        parser.format(message).then(wechatMessage => {
            expect(wechatMessage.touser).equal("oXFfsv1N3......")
            expect(wechatMessage.msgtype).equal("news")
            expect(wechatMessage.news.articles[0].title).equal("Title1")
            expect(wechatMessage.news.articles[0].description).equal("Text1")
            expect(wechatMessage.news.articles[0].url).equal("https://storage.googleapis.com/paas-storage/3-2_dress.jpg")
            expect(wechatMessage.news.articles[0].picurl).equal("https://storage.googleapis.com/paas-storage/3-2_dress.jpg")

            expect(wechatMessage.news.articles[1].title).equal("Title2")
            expect(wechatMessage.news.articles[1].description).equal("Text2")
            expect(wechatMessage.news.articles[1].url).equal("https://storage.googleapis.com/paas-storage/3-2_dress.jpg")
            expect(wechatMessage.news.articles[1].picurl).equal("https://storage.googleapis.com/paas-storage/3-2_dress.jpg")
        })

    })

})