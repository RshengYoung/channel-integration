import { expect } from 'chai'
import 'mocha'

import { MESSENGER } from '../config'
import { MessengerClient } from '../src/messenger/adapter'
import { Adapter } from '../src/interface'
import { IntegrationMessage } from '../src/model'

describe("Messenger", () => {
    const messenger: Adapter = new MessengerClient(MESSENGER)

    it("Send text", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "1741223715936491",
            message: {
                type: "text",
                text: "Messenger Test Message"
            }
        }
        const result = await messenger.send(message)
        expect(result.status).equal("ok")
    })

    it("Send image", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "1741223715936491",
            message: {
                type: "image",
                image: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
            }
        }
        const result = await messenger.send(message)
        expect(result.status).equal("ok")
    })

    it("Send video", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "1741223715936491",
            message: {
                type: "video",
                video: {
                    previewImage: "",
                    videoUrl: "https://storage.googleapis.com/paas-storage/video/1-2_drink.mp4"
                }
            }
        }
        const result = await messenger.send(message)
        expect(result.status).equal("ok")
    }).timeout(10000)

    it("Send audio", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "1741223715936491",
            message: {
                type: "audio",
                audio: { audioUrl: "https://storage.googleapis.com/paas-storage/audio/1-2_drink.m4a" }
            }
        }
        const result = await messenger.send(message)
        expect(result.status).equal("ok")
    })

    it("Send template button", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "1741223715936491",
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
        const result = await messenger.send(message)
        expect(result.status).equal("ok")
    })

    it("Send template carousel", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "1741223715936491",
            message: {
                type: "template",
                description: "This is a carousel template",
                template: {
                    type: "carousel",
                    elements: [
                        {
                            image: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
                            url: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
                            title: "this is menu1",
                            content: "description1",
                            buttons: [
                                {
                                    type: "postback",
                                    label: "Buy1",
                                    data: "action=buy&itemid=111"
                                },
                                // {
                                //     type: "phoneNumber",
                                //     label: "Call Me",
                                //     phone: "+886912345678"
                                // }
                            ]
                        },
                        {
                            image: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
                            url: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
                            title: "this is menu2",
                            content: "description2",
                            buttons: [
                                {
                                    type: "postback",
                                    label: "Buy2",
                                    data: "action=buy&itemid=111"
                                },
                                // {
                                //     type: "phoneNumber",
                                //     label: "Call Me",
                                //     phone: "+886912345678"
                                // }
                            ]
                        }
                    ]
                }
            }
        }
        const result = await messenger.send(message)
        expect(result.status).equal("ok")
    })

    it("Send quickreply ", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "1741223715936491",
            message: {
                type: "quickReply",
                title: "What's your favorite movie genre?",
                elements: [
                    {
                        type: "text",
                        label: "Iron Man",
                        data: "Iron Man"
                    },
                    {
                        type: "text",
                        label: "The Fast and the Furious",
                        data: "The Fast and the Furious"
                    }
                ]
            }
        }
        const result = await messenger.send(message)
        expect(result.status).equal("ok")
    })

    it("Send TypingOn", async () => {
        const message: IntegrationMessage = {
            channel: "messenger",
            receiver: "1741223715936491",
            message: {
                type: "typing",
                state: "on"
            }
        }
        const result = await messenger.send(message)
        expect(result.status).equal("ok")
    })

})