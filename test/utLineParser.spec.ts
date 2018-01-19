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
            message: [
                {
                    type: "text",
                    text: "Line Test Message...1"
                },
                {
                    type: "text",
                    text: "Line Test Message...2"
                }
            ]
        }
        parser.format(message).then(lineMessage => {
            expect(lineMessage[0].type).equal("text")
            expect(lineMessage[0].text).equal("Line Test Message...1")
            expect(lineMessage[1].type).equal("text")
            expect(lineMessage[1].text).equal("Line Test Message...2")
        })

    })

    it("Image Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: [
                {
                    type: "text",
                    text: "Text1"
                },
                {
                    type: "image",
                    image: "https://demo.image.url/sample.jpg"
                }
            ]
        }
        parser.format(message).then(lineMessage => {
            expect(lineMessage[0].type).equal("text")
            expect(lineMessage[0].text).equal("Text1")
    
            expect(lineMessage[1].type).equal("image")
            expect(lineMessage[1].originalContentUrl).equal("https://demo.image.url/sample.jpg")
            expect(lineMessage[1].previewImageUrl).equal("https://demo.image.url/sample.jpg")
        })        
    })

    it("Video Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: [
                {
                    type: "text",
                    text: "Text1"
                },
                {
                    type: "image",
                    image: "https://demo.image.url/sample.jpg"
                },
                {
                    type: "video",
                    video: {
                        title: "Video Test",
                        description: "Video Description",
                        previewImage: "https://previewImage.image/sample.jpg",
                        videoUrl: "https://demo.video.url/sample.mp4"
                    }
                }
            ]
        }
        parser.format(message).then(lineMessage => {
            expect(lineMessage[0].type).equal("text")
            expect(lineMessage[0].text).equal("Text1")
    
            expect(lineMessage[1].type).equal("image")
            expect(lineMessage[1].originalContentUrl).equal("https://demo.image.url/sample.jpg")
            expect(lineMessage[1].previewImageUrl).equal("https://demo.image.url/sample.jpg")
    
            expect(lineMessage[2].type).equal("video")
            expect(lineMessage[2].originalContentUrl).equal("https://demo.video.url/sample.mp4")
            expect(lineMessage[2].previewImageUrl).equal("https://previewImage.image/sample.jpg")
        })        
    })

    it("Audio Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: [
                {
                    type: "text",
                    text: "Text1"
                },
                {
                    type: "image",
                    image: "https://demo.image.url/sample.jpg"
                },
                {
                    type: "video",
                    video: {
                        title: "Video Test",
                        description: "Video Description",
                        previewImage: "https://previewImage.image/sample.jpg",
                        videoUrl: "https://demo.video.url/sample.mp4"
                    }
                },
                {
                    type: "audio",
                    audio: {
                        audioUrl: "https://demo.audio.url/sample.mp3",
                        duration: 123456
                    }
                }
            ]
        }
        parser.format(message).then(lineMessage => {
            expect(lineMessage[0].type).equal("text")
            expect(lineMessage[0].text).equal("Text1")
    
            expect(lineMessage[1].type).equal("image")
            expect(lineMessage[1].originalContentUrl).equal("https://demo.image.url/sample.jpg")
            expect(lineMessage[1].previewImageUrl).equal("https://demo.image.url/sample.jpg")
    
            expect(lineMessage[2].type).equal("video")
            expect(lineMessage[2].originalContentUrl).equal("https://demo.video.url/sample.mp4")
            expect(lineMessage[2].previewImageUrl).equal("https://previewImage.image/sample.jpg")
    
            expect(lineMessage[3].type).equal("audio")
            expect(lineMessage[3].originalContentUrl).equal("https://demo.audio.url/sample.mp3")
            expect(lineMessage[3].duration).equal(123456)
        })
    })

    it("Buttons Template Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: [{
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
            }]
        }

        parser.format(message).then(lineMessage => {
            expect(lineMessage[0].type).equal("template")
            expect(lineMessage[0].altText).equal("This is a buttons template")
            expect(lineMessage[0].template.type).equal("buttons")
            expect(lineMessage[0].template.thumbnailImageUrl).equal("https://demo.image.url/sample.jpg")
            expect(lineMessage[0].template.imageAspectRatio).equal("rectangle")
            expect(lineMessage[0].template.imageSize).equal("cover")
            expect(lineMessage[0].template.imageBackgroundColor).equal("#ffffff")
            expect(lineMessage[0].template.title).equal("Demo")
            expect(lineMessage[0].template.text).equal("Please select")
            expect(lineMessage[0].template.actions[0].type).equal("postback")
            expect(lineMessage[0].template.actions[0].label).equal("B1")
            expect(lineMessage[0].template.actions[0].data).equal("action=b1")
            expect(lineMessage[0].template.actions[0].text).equal("This is B1")
    
            expect(lineMessage[0].template.actions[1].type).equal("message")
            expect(lineMessage[0].template.actions[1].label).equal("B2")
            expect(lineMessage[0].template.actions[1].text).equal("This is B2")
    
            expect(lineMessage[0].template.actions[2].type).equal("uri")
            expect(lineMessage[0].template.actions[2].label).equal("B3")
            expect(lineMessage[0].template.actions[2].uri).equal("https://demo.url/sample")  
        })        
    })

    it("Confirm Template Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: [{
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
            }]
        }

        parser.format(message).then(lineMessage=> {
            expect(lineMessage[0].type).equal("template")
            expect(lineMessage[0].altText).equal("This is a confirm template")
            expect(lineMessage[0].template.type).equal("confirm")
            expect(lineMessage[0].template.text).equal("Yes or no")
    
            expect(lineMessage[0].template.actions[0].type).equal("message")
            expect(lineMessage[0].template.actions[0].label).equal("Yes")
            expect(lineMessage[0].template.actions[0].text).equal("yes")
    
            expect(lineMessage[0].template.actions[1].type).equal("message")
            expect(lineMessage[0].template.actions[1].label).equal("No")
            expect(lineMessage[0].template.actions[1].text).equal("no")    
        })
    })

    it("Carousel Template Message format()", () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "Uc6af6c3......",
            message: [{
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
            }]
        }

        parser.format(message).then(lineMessage => {
            expect(lineMessage[0].type).equal("template")
            expect(lineMessage[0].altText).equal("This is a carousel template")
            expect(lineMessage[0].template.type).equal("carousel")
    
            expect(lineMessage[0].template.columns[0].thumbnailImageUrl).equal("https://example.com/bot/images/item1.jpg")
            expect(lineMessage[0].template.columns[0].title).equal("this is menu1")
            expect(lineMessage[0].template.columns[0].text).equal("description1")
            expect(lineMessage[0].template.columns[0].actions[0].type).equal("postback")
            expect(lineMessage[0].template.columns[0].actions[0].label).equal("Buy1")
            expect(lineMessage[0].template.columns[0].actions[0].data).equal("action=buy&itemid=111")
            expect(lineMessage[0].template.columns[0].actions[1].type).equal("message")
            expect(lineMessage[0].template.columns[0].actions[1].label).equal("Add to cart1")
            expect(lineMessage[0].template.columns[0].actions[1].text).equal("Message1")
            expect(lineMessage[0].template.columns[0].actions[2].type).equal("uri")
            expect(lineMessage[0].template.columns[0].actions[2].label).equal("View detail1")
            expect(lineMessage[0].template.columns[0].actions[2].uri).equal("http://example.com/page/111")
    
            expect(lineMessage[0].template.columns[1].actions[0].type).equal("postback")
            expect(lineMessage[0].template.columns[1].actions[0].label).equal("Buy2")
            expect(lineMessage[0].template.columns[1].actions[0].data).equal("action=buy&itemid=111")
            expect(lineMessage[0].template.columns[1].actions[1].type).equal("message")
            expect(lineMessage[0].template.columns[1].actions[1].label).equal("Add to cart2")
            expect(lineMessage[0].template.columns[1].actions[1].text).equal("Message2")
            expect(lineMessage[0].template.columns[1].actions[2].type).equal("uri")
            expect(lineMessage[0].template.columns[1].actions[2].label).equal("View detail2")
            expect(lineMessage[0].template.columns[1].actions[2].uri).equal("http://example.com/page/111")
        })        
    })

})