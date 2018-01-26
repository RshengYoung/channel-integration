import { expect } from 'chai'
import 'mocha'

import { MessengerParser } from '../src/messenger/parser'
import { Parser } from '../src/interface'
import { IntegrationMessage } from '../src/model'

describe("MessengerParser", () => {
    const parser: Parser = new MessengerParser()

    it("Text Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "17412237......",
            message: {
                type: "text",
                text: "Messenger Test Message"
            }
        }
        const messengerMessage = await parser.format(message)
        expect(messengerMessage.recipient.id).equal("17412237......")
        expect(messengerMessage.message.text).equal("Messenger Test Message")
    })

    it("Image Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "17412237......",
            message: {
                type: "image",
                image: "https://demo.image.url/sample.jpg"
            }
        }
        const messengerMessage = await parser.format(message)
        expect(messengerMessage.recipient.id).equal("17412237......")
        expect(messengerMessage.message.attachment.type).equal("image")
        expect(messengerMessage.message.attachment.payload.url).equal("https://demo.image.url/sample.jpg")
    })

    it("Video Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "17412237......",
            message: {
                type: "video",
                video: {
                    previewImage: "https://previewImage.image/sample.jpg",
                    videoUrl: "https://demo.video.url/sample.mp4"
                }
            }
        }
        const messengerMessage = await parser.format(message)
        expect(messengerMessage.recipient.id).equal("17412237......")
        expect(messengerMessage.message.attachment.type).equal("video")
        expect(messengerMessage.message.attachment.payload.url).equal("https://demo.video.url/sample.mp4")
    })

    it("Audio Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "17412237......",
            message: {
                type: "audio",
                audio: {
                    audioUrl: "https://demo.audio.url/sample.mp3",
                    duration: 123456
                }
            }
        }
        const messengerMessage = await parser.format(message)
        expect(messengerMessage.recipient.id).equal("17412237......")
        expect(messengerMessage.message.attachment.type).equal("audio")
        expect(messengerMessage.message.attachment.payload.url).equal("https://demo.audio.url/sample.mp3")
    })

    it("File Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "17412237......",
            message: {
                type: "file",
                file: "https://storage.googleapis.com/paas-storage/Channel%20Object.docx"
            }
        }
        const messengerMessage = await parser.format(message)
        expect(messengerMessage.recipient.id).equal("17412237......")
        expect(messengerMessage.message.attachment.type).equal("file")
        expect(messengerMessage.message.attachment.payload.url).equal("https://storage.googleapis.com/paas-storage/Channel%20Object.docx")
    })

    // it("QuickReply Message format()", async () => {
    //     const message:IntegrationMessage = {
    //         channel: "messenger",
    //         receiver: "17412237......",
    //         message: {
    //             type: "quickReply",
    //             title: "What's your favorite movie genre?",
    //             elements: [
    //                 {
    //                     type: "text",
    //                     label: "Iron Man",
    //                     data: "Iron Man"
    //                 },
    //                 {
    //                     type: "text",
    //                     label: "The Fast and the Furious",
    //                     data: "The Fast and the Furious"
    //                 }
    //             ]
    //         }
    //     }
    // })

    it("Buttons Template Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "17412237......",
            message: {
                type: "template",
                description: "This is a buttons template",
                template: {
                    type: "button",
                    title: "Demo",
                    content: "Content",
                    buttons: [
                        {
                            type: "postback",
                            label: "B1",
                            data: "action=b1",
                            text: "This is B1"
                        },
                        {
                            type: "phoneNumber",
                            label: "Call Me",
                            phone: "+886912345678"
                        },
                        {
                            type: "url",
                            label: "B3",
                            url: "https://demo.url/sample"
                        }
                    ]
                }
            }
        }
        const messengerMessage = await parser.format(message)
        expect(messengerMessage.recipient.id).equal("17412237......")
        expect(messengerMessage.message.attachment.type).equal("template")
        expect(messengerMessage.message.attachment.payload.template_type).equal("button")
        expect(messengerMessage.message.attachment.payload.text).equal("Content")

        expect(messengerMessage.message.attachment.payload.buttons[0].type).equal("postback")
        expect(messengerMessage.message.attachment.payload.buttons[0].title).equal("B1")
        expect(messengerMessage.message.attachment.payload.buttons[0].payload).equal("action=b1")

        expect(messengerMessage.message.attachment.payload.buttons[1].type).equal("phone_number")
        expect(messengerMessage.message.attachment.payload.buttons[1].title).equal("Call Me")
        expect(messengerMessage.message.attachment.payload.buttons[1].payload).equal("+886912345678")

        expect(messengerMessage.message.attachment.payload.buttons[2].type).equal("web_url")
        expect(messengerMessage.message.attachment.payload.buttons[2].title).equal("B3")
        expect(messengerMessage.message.attachment.payload.buttons[2].url).equal("https://demo.url/sample")
    })

    it("Carousel Template Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "17412237......",
            message: {
                type: "template",
                description: "This is a carousel template",
                template: {
                    type: "carousel",
                    elements: [
                        {
                            image: "https://example.com/bot/images/item1.jpg",
                            url: "https://example.com/bot/images/item1.html",
                            title: "this is menu1",
                            content: "description1",
                            buttons: [
                                {
                                    type: "postback",
                                    label: "Buy1",
                                    data: "action=buy&itemid=111"
                                },
                                {
                                    type: "phoneNumber",
                                    label: "Call Me",
                                    phone: "+886912345678"
                                },
                                {
                                    type: "accountLink",
                                    label: "Login",
                                    url: "http://example.com/page/111"
                                }
                            ]
                        },
                        {
                            image: "https://example.com/bot/images/item2.jpg",
                            url: "https://example.com/bot/images/item2.html",
                            title: "this is menu2",
                            content: "description2",
                            buttons: [
                                {
                                    type: "postback",
                                    label: "Buy2",
                                    data: "action=buy&itemid=111"
                                },
                                {
                                    type: "phoneNumber",
                                    label: "Call Me",
                                    phone: "+886912345678"
                                },
                                {
                                    type: "accountLink",
                                    label: "Login",
                                    url: "http://example.com/page/111"
                                }
                            ]
                        }
                    ]
                }
            }
        }

        const messengerMessage = await parser.format(message)
        expect(messengerMessage.recipient.id).equal("17412237......")
        expect(messengerMessage.message.attachment.type).equal("template")
        expect(messengerMessage.message.attachment.payload.template_type).equal("generic")

        expect(messengerMessage.message.attachment.payload.elements[0].title).equal("this is menu1")
        expect(messengerMessage.message.attachment.payload.elements[0].subtitle).equal("description1")
        expect(messengerMessage.message.attachment.payload.elements[0].item_url).equal("https://example.com/bot/images/item1.html")
        expect(messengerMessage.message.attachment.payload.elements[0].image_url).equal("https://example.com/bot/images/item1.jpg")
        expect(messengerMessage.message.attachment.payload.elements[0].buttons[0].type).equal("postback")
        expect(messengerMessage.message.attachment.payload.elements[0].buttons[0].title).equal("Buy1")
        expect(messengerMessage.message.attachment.payload.elements[0].buttons[0].payload).equal("action=buy&itemid=111")
        expect(messengerMessage.message.attachment.payload.elements[0].buttons[1].type).equal("phone_number")
        expect(messengerMessage.message.attachment.payload.elements[0].buttons[1].title).equal("Call Me")
        expect(messengerMessage.message.attachment.payload.elements[0].buttons[1].payload).equal("+886912345678")
        expect(messengerMessage.message.attachment.payload.elements[0].buttons[2].type).equal("account_link")
        expect(messengerMessage.message.attachment.payload.elements[0].buttons[2].url).equal("http://example.com/page/111")

        expect(messengerMessage.message.attachment.payload.elements[1].title).equal("this is menu2")
        expect(messengerMessage.message.attachment.payload.elements[1].subtitle).equal("description2")
        expect(messengerMessage.message.attachment.payload.elements[1].item_url).equal("https://example.com/bot/images/item2.html")
        expect(messengerMessage.message.attachment.payload.elements[1].image_url).equal("https://example.com/bot/images/item2.jpg")
        expect(messengerMessage.message.attachment.payload.elements[1].buttons[0].type).equal("postback")
        expect(messengerMessage.message.attachment.payload.elements[1].buttons[0].title).equal("Buy2")
        expect(messengerMessage.message.attachment.payload.elements[1].buttons[0].payload).equal("action=buy&itemid=111")
        expect(messengerMessage.message.attachment.payload.elements[1].buttons[1].type).equal("phone_number")
        expect(messengerMessage.message.attachment.payload.elements[1].buttons[1].title).equal("Call Me")
        expect(messengerMessage.message.attachment.payload.elements[1].buttons[1].payload).equal("+886912345678")
        expect(messengerMessage.message.attachment.payload.elements[1].buttons[2].type).equal("account_link")
        expect(messengerMessage.message.attachment.payload.elements[1].buttons[2].url).equal("http://example.com/page/111")
    })

})