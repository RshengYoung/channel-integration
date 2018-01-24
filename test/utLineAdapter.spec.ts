import { expect } from 'chai'
import 'mocha'

import { LINE } from '../config'
import { LineClient } from '../src/line/adapter'
import { Adapter } from '../src/interface'
import { IntegrationMessage } from '../src/model'

describe("Line", () => {
    const line: Adapter = new LineClient(LINE)

    it("Send text", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: {
                type: "text",
                text: "Text Message"
            }
        }
        const result = await line.send(message)
        expect(result.status).equal("ok")
    })

    it("Send location", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: {
                type: "location",
                location: {
                    title: "Test Location",
                    address: "Test Location Address",
                    latitude: 35.65910807942215,
                    longitude: 139.70372892916203
                }
            }
        }
        const result = await line.send(message)
        expect(result.status).equal("ok")
    })

    it("Send sticker", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: {
                type: "sticker",
                sticker: {
                    packageId: "1",
                    stickerId: "1"
                }
            }
        }
        const result = await line.send(message)
        expect(result.status).equal("ok")
    })

    it("Send image", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: {
                type: "image",
                image: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
            }
        }
        const result = await line.send(message)
        expect(result.status).equal("ok")
    })

    it("Send video", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
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
        const result = await line.send(message)
        expect(result.status).equal("ok")
    })

    it("Send audio", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: {
                type: "audio",
                audio: {
                    audioUrl: "https://storage.googleapis.com/paas-storage/audio/1-2_drink.m4a",
                    duration: 2000
                }
            }
        }
        await line.send(message).then(response => {
            expect(response.status).equal("ok")
        })
    })

    it("Send template buttons", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: {
                type: "template",
                description: "This is a buttons template",
                template: {
                    type: "button",
                    image: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
                    // imageAspectRatio: "square",
                    // imageSize: "cover",
                    // imageBackgroundColor: "#FFFFFF",
                    title: "Demo",
                    content: "Please select",
                    buttons: [
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
                            type: "url",
                            label: "B3",
                            url: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
                        }
                    ]
                }
            }
        }
        const result = await line.send(message)
        expect(result.status).equal("ok")
    })

    it("Send template confirm", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: {
                type: "template",
                description: "This is a confirm template",
                template: {
                    type: "confirm",
                    content: "Yes or no",
                    buttons: [
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
        const result = await line.send(message)
        expect(result.status).equal("ok")
    })

    it("Send template carousel", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: {
                type: "template",
                description: "This is a carousel template",
                template: {
                    type: "carousel",
                    elements: [
                        {
                            image: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
                            title: "this is menu1",
                            content: "description1",
                            buttons: [
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
                                    type: "url",
                                    label: "View detail1",
                                    url: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
                                }
                            ]
                        },
                        {
                            image: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
                            title: "this is menu2",
                            content: "description2",
                            buttons: [
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
                                    type: "url",
                                    label: "View detail2",
                                    url: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
                                }
                            ]
                        }
                    ]
                }
            }
        }
        const result = await line.send(message)
        expect(result.status).equal("ok")
    })

    it("Send template imageCarousel", async() => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: {
                type: "template",
                description: "This is a ImageCarousel template",
                template: {
                    type: "imageCarousel",
                    elements: [
                        {
                            image: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
                            action: {
                                type: "message",
                                text: "Image 1"
                            }
                        },
                        {
                            image: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
                            action: {
                                type: "postback",
                                text: "Image 2",
                                data: "data=image2"
                            }
                        }
                    ]
                }
            }
        }
        const result = await line.send(message)
        expect(result.status).equal("ok")
    })

    it("Send ImageMap Message", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: {
                type: "imageMap",
                imageMap: {
                    image: "https://storage.googleapis.com/paas-storage/coupons",
                    description: "My Product",
                    width: 1040,
                    height: 1040,
                    actions: [
                        {
                            type: "message",
                            text: "Drink",
                            area: { x: 0, y: 0, width: 520, height: 520 }
                        },
                        {
                            type: "message",
                            text: "Meal",
                            area: { x: 520, y: 0, width: 520, height: 520 }
                        },
                        {
                            type: "message",
                            text: "Fruit",
                            area: { x: 0, y: 520, width: 520, height: 520 }
                        },
                        {
                            type: "message",
                            text: "Location",
                            area: { x: 520, y: 520, width: 520, height: 520 }
                        }
                    ]
                }
            }
        }
        const result = await line.send(message)
        expect(result.status).equal("ok")
    })

})