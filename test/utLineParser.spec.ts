import { expect } from 'chai'
import 'mocha'

import { LineParser } from '../src/line/parser'
import { Parser } from '../src/interface';
import { IntegrationMessage } from '../src/model';

describe("LineParaer", () => {
    const parser: Parser = new LineParser()

    it("Text Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: {
                type: "text",
                text: "Line Test Message"
            }
        }
        parser.format(message).then(lineMessage => {
            expect(lineMessage.type).equal("text")
            expect(lineMessage.text).equal("Line Test Message")
        })

    })

    it("Image Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: {
                type: "image",
                image: "https://demo.image.url/sample.jpg"
            }
        }
        parser.format(message).then(lineMessage => {
            expect(lineMessage.type).equal("image")
            expect(lineMessage.originalContentUrl).equal("https://demo.image.url/sample.jpg")
            expect(lineMessage.previewImageUrl).equal("https://demo.image.url/sample.jpg")
        })
    })

    it("Sticker Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: {
                type: "sticker",
                sticker: {
                    packageId: "1",
                    stickerId: "1"
                }
            }
        }
        parser.format(message).then(lineMessage => {
            expect(lineMessage.type).equal("sticker")
            expect(lineMessage.packageId).equal("1")
            expect(lineMessage.stickerId).equal("1")
        })

    })

    it("Video Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: {
                type: "video",
                video: {
                    title: "Video Test",
                    description: "Video Description",
                    previewImage: "https://previewImage.image/sample.jpg",
                    videoUrl: "https://demo.video.url/sample.mp4"
                }
            }
        }
        parser.format(message).then(lineMessage => {
            expect(lineMessage.type).equal("video")
            expect(lineMessage.originalContentUrl).equal("https://demo.video.url/sample.mp4")
            expect(lineMessage.previewImageUrl).equal("https://previewImage.image/sample.jpg")
        })
    })

    it("Audio Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: {
                type: "audio",
                audio: {
                    audioUrl: "https://demo.audio.url/sample.mp3",
                    duration: 123456
                }
            }
        }
        parser.format(message).then(lineMessage => {
            expect(lineMessage.type).equal("audio")
            expect(lineMessage.originalContentUrl).equal("https://demo.audio.url/sample.mp3")
            expect(lineMessage.duration).equal(123456)
        })
    })

    it("Buttons Template Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: {
                type: "template",
                description: "This is a buttons template",
                template: {
                    type: "buttons",
                    thumbnailImageUrl: "https://demo.image.url/sample.jpg",
                    imageAspectRatio: "rectangle",
                    imageSize: "cover",
                    imageBackgroundColor: "#ffffff",
                    title: "Demo",
                    text: "Please select",
                    actions: [
                        {
                            type: "postback",
                            label: "B1",
                            data: "action=b1",
                            text: "This is B1"
                        },
                        {
                            type: "message",
                            label: "B2",
                            text: "This is B2"
                        },
                        {
                            type: "uri",
                            label: "B3",
                            uri: "https://demo.url/sample"
                        }
                    ]
                }
            }
        }

        parser.format(message).then(lineMessage => {
            expect(lineMessage.type).equal("template")
            expect(lineMessage.altText).equal("This is a buttons template")
            expect(lineMessage.template.type).equal("buttons")
            expect(lineMessage.template.thumbnailImageUrl).equal("https://demo.image.url/sample.jpg")
            expect(lineMessage.template.imageAspectRatio).equal("rectangle")
            expect(lineMessage.template.imageSize).equal("cover")
            expect(lineMessage.template.imageBackgroundColor).equal("#ffffff")
            expect(lineMessage.template.title).equal("Demo")
            expect(lineMessage.template.text).equal("Please select")
            expect(lineMessage.template.actions[0].type).equal("postback")
            expect(lineMessage.template.actions[0].label).equal("B1")
            expect(lineMessage.template.actions[0].data).equal("action=b1")
            expect(lineMessage.template.actions[0].text).equal("This is B1")

            expect(lineMessage.template.actions[1].type).equal("message")
            expect(lineMessage.template.actions[1].label).equal("B2")
            expect(lineMessage.template.actions[1].text).equal("This is B2")

            expect(lineMessage.template.actions[2].type).equal("uri")
            expect(lineMessage.template.actions[2].label).equal("B3")
            expect(lineMessage.template.actions[2].uri).equal("https://demo.url/sample")
        })
    })

    it("Confirm Template Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: {
                type: "template",
                description: "This is a confirm template",
                template: {
                    type: "confirm",
                    text: "Yes or no",
                    actions: [
                        {
                            type: "message",
                            label: "Yes",
                            text: "yes"
                        },
                        {
                            type: "message",
                            label: "No",
                            text: "no"
                        }
                    ]
                }
            }
        }

        parser.format(message).then(lineMessage => {
            expect(lineMessage.type).equal("template")
            expect(lineMessage.altText).equal("This is a confirm template")
            expect(lineMessage.template.type).equal("confirm")
            expect(lineMessage.template.text).equal("Yes or no")

            expect(lineMessage.template.actions[0].type).equal("message")
            expect(lineMessage.template.actions[0].label).equal("Yes")
            expect(lineMessage.template.actions[0].text).equal("yes")

            expect(lineMessage.template.actions[1].type).equal("message")
            expect(lineMessage.template.actions[1].label).equal("No")
            expect(lineMessage.template.actions[1].text).equal("no")
        })
    })

    it("Carousel Template Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: {
                type: "template",
                description: "This is a carousel template",
                template: {
                    type: "carousel",
                    columns: [
                        {
                            thumbnailImageUrl: "https://example.com/bot/images/item1.jpg",
                            title: "this is menu1",
                            text: "description1",
                            actions: [
                                {
                                    type: "postback",
                                    label: "Buy1",
                                    data: "action=buy&itemid=111"
                                },
                                {
                                    type: "message",
                                    label: "Add to cart1",
                                    text: "Message1"
                                },
                                {
                                    type: "uri",
                                    label: "View detail1",
                                    uri: "http://example.com/page/111"
                                }
                            ]
                        },
                        {
                            thumbnailImageUrl: "https://example.com/bot/images/item2.jpg",
                            title: "this is menu2",
                            text: "description2",
                            actions: [
                                {
                                    type: "postback",
                                    label: "Buy2",
                                    data: "action=buy&itemid=111"
                                },
                                {
                                    type: "message",
                                    label: "Add to cart2",
                                    text: "Message2"
                                },
                                {
                                    type: "uri",
                                    label: "View detail2",
                                    uri: "http://example.com/page/111"
                                }
                            ]
                        }
                    ]
                }
            }
        }

        parser.format(message).then(lineMessage => {
            expect(lineMessage.type).equal("template")
            expect(lineMessage.altText).equal("This is a carousel template")
            expect(lineMessage.template.type).equal("carousel")

            expect(lineMessage.template.columns[0].thumbnailImageUrl).equal("https://example.com/bot/images/item1.jpg")
            expect(lineMessage.template.columns[0].title).equal("this is menu1")
            expect(lineMessage.template.columns[0].text).equal("description1")
            expect(lineMessage.template.columns[0].actions[0].type).equal("postback")
            expect(lineMessage.template.columns[0].actions[0].label).equal("Buy1")
            expect(lineMessage.template.columns[0].actions[0].data).equal("action=buy&itemid=111")
            expect(lineMessage.template.columns[0].actions[1].type).equal("message")
            expect(lineMessage.template.columns[0].actions[1].label).equal("Add to cart1")
            expect(lineMessage.template.columns[0].actions[1].text).equal("Message1")
            expect(lineMessage.template.columns[0].actions[2].type).equal("uri")
            expect(lineMessage.template.columns[0].actions[2].label).equal("View detail1")
            expect(lineMessage.template.columns[0].actions[2].uri).equal("http://example.com/page/111")

            expect(lineMessage.template.columns[1].actions[0].type).equal("postback")
            expect(lineMessage.template.columns[1].actions[0].label).equal("Buy2")
            expect(lineMessage.template.columns[1].actions[0].data).equal("action=buy&itemid=111")
            expect(lineMessage.template.columns[1].actions[1].type).equal("message")
            expect(lineMessage.template.columns[1].actions[1].label).equal("Add to cart2")
            expect(lineMessage.template.columns[1].actions[1].text).equal("Message2")
            expect(lineMessage.template.columns[1].actions[2].type).equal("uri")
            expect(lineMessage.template.columns[1].actions[2].label).equal("View detail2")
            expect(lineMessage.template.columns[1].actions[2].uri).equal("http://example.com/page/111")
        })
    })

})