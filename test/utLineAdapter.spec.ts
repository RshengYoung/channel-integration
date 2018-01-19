import { expect } from 'chai'
import 'mocha'


import { LINE } from '../config'
import { LineClient } from '../src/line/adapter'
import { Adapter } from '../src/interface';
import { IntegrationMessage } from '../src/model';

describe("Line", () => {
    const line: Adapter = new LineClient(LINE)

    it("send text", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: [
                {
                    type: "text",
                    text: "Text1"
                }
            ]
        }

        await line.send(message).then(response => {
            expect(response.status).equal("ok")
        })

    })

    it("send image", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: [
                {
                    type: "text",
                    text: "Text1"
                },
                {
                    type: "image",
                    image: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
                }
            ]
        }

        await line.send(message).then(response => {
            expect(response.status).equal("ok")
        })

    })

    it("send video", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: [
                {
                    type: "text",
                    text: "Text1"
                },
                {
                    type: "image",
                    image: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
                },
                {
                    type: "video",
                    video: {
                        title: "Video Test",
                        description: "Video Description",
                        previewImage: "https://storage.googleapis.com/paas-storage/image/1-2_drink.jpg",
                        videoUrl: "https://storage.googleapis.com/paas-storage/video/1-2_drink.mp4"
                    }
                }
            ]
        }

        await line.send(message).then(response => {
            expect(response.status).equal("ok")
        })

    })

    it("send audio", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: [
                {
                    type: "text",
                    text: "Text1"
                },
                {
                    type: "image",
                    image: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
                },
                {
                    type: "video",
                    video: {
                        title: "Video Test",
                        description: "Video Description",
                        previewImage: "https://storage.googleapis.com/paas-storage/image/1-2_drink.jpg",
                        videoUrl: "https://storage.googleapis.com/paas-storage/video/1-2_drink.mp4"
                    }
                },
                {
                    type: "audio",
                    audio: {
                        audioUrl: "https://storage.googleapis.com/paas-storage/audio/1-2_drink.m4a",
                        duration: 2000
                    }
                }
            ]
        }

        await line.send(message).then(response => {
            expect(response.status).equal("ok")
        })

    })

    it("send template buttons", async() => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: [{
                type: "template",
                description: "This is a buttons template",
                template: {
                    type: "buttons",
                    thumbnailImageUrl: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
                    imageAspectRatio: "square",
                    imageSize: "cover",
                    imageBackgroundColor: "#FFFFFF",
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
                            uri: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
                        }
                    ]
                }
            }]
        }

        await line.send(message).then(response => {
            expect(response.status).equal("ok")
        })
    })

    it("send template confirm", async() => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
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

        await line.send(message).then(response => {
            expect(response.status).equal("ok")
        })
    })

    it("send template carousel", async () => {
        const message: IntegrationMessage = {
            channel: "line",
            receiver: "U40ed24268853ce00d70c4dd5e7b35ea9",
            message: [{
                type: "template",
                description: "This is a carousel template",
                template: {
                    type: "carousel",
                    columns: [
                        {
                            thumbnailImageUrl: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
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
                                    uri: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
                                }
                            ]
                        },
                        {
                            thumbnailImageUrl: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg",
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
                                    uri: "https://storage.googleapis.com/paas-storage/3-2_dress.jpg"
                                }
                            ]
                        }
                    ]
                }
            }]
        }

        await line.send(message).then(response => {
            expect(response.status).equal("ok")
        })
    })


})