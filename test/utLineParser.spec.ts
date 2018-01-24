import { expect } from 'chai'
import 'mocha'

import { LineParser } from '../src/line/parser'
import { Parser } from '../src/interface';
import { IntegrationMessage } from '../src/model';

describe("LineParaer", () => {
    const parser: Parser = new LineParser()

    it("Text Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: {
                type: "text",
                text: "Line Test Message"
            }
        }
        const lineMessage = await parser.format(message)
        expect(lineMessage.type).equal("text")
        expect(lineMessage.text).equal("Line Test Message")
    })

    it("Location Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
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
        const lineMessage = await parser.format(message)
        expect(lineMessage.type).equal("location")
        expect(lineMessage.title).equal("Test Location")
        expect(lineMessage.address).equal("Test Location Address")
        expect(lineMessage.latitude).equal(35.65910807942215)
        expect(lineMessage.longitude).equal(139.70372892916203)
    })

    it("Image Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: {
                type: "image",
                image: "https://demo.image.url/sample.jpg"
            }
        }
        const lineMessage = await parser.format(message)
        expect(lineMessage.type).equal("image")
        expect(lineMessage.originalContentUrl).equal("https://demo.image.url/sample.jpg")
        expect(lineMessage.previewImageUrl).equal("https://demo.image.url/sample.jpg")
    })

    it("Sticker Message format()", async () => {
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
        const lineMessage = await parser.format(message)
        expect(lineMessage.type).equal("sticker")
        expect(lineMessage.packageId).equal("1")
        expect(lineMessage.stickerId).equal("1")
    })

    it("Video Message format()", async () => {
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
        const lineMessage = await parser.format(message)
        expect(lineMessage.originalContentUrl).equal("https://demo.video.url/sample.mp4")
        expect(lineMessage.previewImageUrl).equal("https://previewImage.image/sample.jpg")
    })

    it("Audio Message format()", async () => {
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
        const lineMessage = await parser.format(message)
        expect(lineMessage.type).equal("audio")
        expect(lineMessage.originalContentUrl).equal("https://demo.audio.url/sample.mp3")
        expect(lineMessage.duration).equal(123456)
    })

    it("Buttons Template Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: {
                type: "template",
                description: "This is a buttons template",
                template: {
                    type: "button",
                    image: "https://demo.image.url/sample.jpg",
                    imageAspectRatio: "rectangle",
                    imageSize: "cover",
                    imageBackgroundColor: "#ffffff",
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
                            type: "message",
                            label: "B2",
                            text: "This is B2"
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

        const lineMessage = await parser.format(message)
        expect(lineMessage.type).equal("template")
        expect(lineMessage.altText).equal("This is a buttons template")
        expect(lineMessage.template.type).equal("buttons")
        expect(lineMessage.template.thumbnailImageUrl).equal("https://demo.image.url/sample.jpg")
        expect(lineMessage.template.imageAspectRatio).equal("rectangle")
        expect(lineMessage.template.imageSize).equal("cover")
        expect(lineMessage.template.imageBackgroundColor).equal("#ffffff")
        expect(lineMessage.template.title).equal("Demo")
        expect(lineMessage.template.text).equal("Content")
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

    it("Confirm Template Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
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

        const lineMessage = await parser.format(message)
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

    it("Carousel Template Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: {
                type: "template",
                description: "This is a carousel template",
                template: {
                    type: "carousel",
                    elements: [
                        {
                            image: "https://example.com/bot/images/item1.jpg",
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
                                    url: "http://example.com/page/111"
                                }
                            ]
                        },
                        {
                            image: "https://example.com/bot/images/item2.jpg",
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
                                    url: "http://example.com/page/111"
                                }
                            ]
                        }
                    ]
                }
            }
        }

        const lineMessage = await parser.format(message)
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

    it("ImageCarousel Template Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: {
                type: "template",
                description: "This is a ImageCarousel template",
                template: {
                    type: "imageCarousel",
                    elements: [
                        {
                            image: "https://demo.image.url/sample1.jpg",
                            action: {
                                type: "message",
                                text: "Image 1"
                            }
                        },
                        {
                            image: "https://demo.image.url/sample2.jpg",
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
        const lineMessage = await parser.format(message)
        expect(lineMessage.type).equal("template")
        expect(lineMessage.altText).equal("This is a ImageCarousel template")
        expect(lineMessage.template.type).equal("image_carousel")

        expect(lineMessage.template.columns[0].imageUrl).equal("https://demo.image.url/sample1.jpg")
        expect(lineMessage.template.columns[0].action.type).equal("message")
        expect(lineMessage.template.columns[0].action.text).equal("Image 1")

        expect(lineMessage.template.columns[1].imageUrl).equal("https://demo.image.url/sample2.jpg")
        expect(lineMessage.template.columns[1].action.type).equal("postback")
        expect(lineMessage.template.columns[1].action.text).equal("Image 2")
        expect(lineMessage.template.columns[1].action.data).equal("data=image2")
    })

    it("ImageMap Message format()", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
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
        const lineMessage = await parser.format(message)
        expect(lineMessage.type).equal("imagemap")
        expect(lineMessage.baseUrl).equal("https://storage.googleapis.com/paas-storage/coupons")
        expect(lineMessage.altText).equal("My Product")
        expect(lineMessage.baseSize.width).equal(1040)
        expect(lineMessage.baseSize.height).equal(1040)

        expect(lineMessage.actions[0].type).equal("message")
        expect(lineMessage.actions[0].text).equal("Drink")
        expect(lineMessage.actions[0].area.x).equal(0)
        expect(lineMessage.actions[0].area.y).equal(0)
        expect(lineMessage.actions[0].area.width).equal(520)
        expect(lineMessage.actions[0].area.height).equal(520)

        expect(lineMessage.actions[1].type).equal("message")
        expect(lineMessage.actions[1].text).equal("Meal")
        expect(lineMessage.actions[1].area.x).equal(520)
        expect(lineMessage.actions[1].area.y).equal(0)
        expect(lineMessage.actions[1].area.width).equal(520)
        expect(lineMessage.actions[1].area.height).equal(520)

        expect(lineMessage.actions[2].type).equal("message")
        expect(lineMessage.actions[2].text).equal("Fruit")
        expect(lineMessage.actions[2].area.x).equal(0)
        expect(lineMessage.actions[2].area.y).equal(520)
        expect(lineMessage.actions[2].area.width).equal(520)
        expect(lineMessage.actions[2].area.height).equal(520)

        expect(lineMessage.actions[3].type).equal("message")
        expect(lineMessage.actions[3].text).equal("Location")
        expect(lineMessage.actions[3].area.x).equal(520)
        expect(lineMessage.actions[3].area.y).equal(520)
        expect(lineMessage.actions[3].area.width).equal(520)
        expect(lineMessage.actions[3].area.height).equal(520)
    })

})