import { TemplateContent, TemplateButtons, TemplateConfirm, TemplateCarousel, TemplateImageCarousel, ImageMapAction } from '@line/bot-sdk'

export type Config = {
    id: string
    secret: string
    accessToken: string
    callbackToken?: string
}

export type IntegrationMessage = {
    channel: "line" | "wechat"
    receiver: string
    message: TextMessage | ImageMessage | VideoMessage | AudioMessage | LocationMessage | StickerMessage | TemplateMessage | ImageMapMessage | NewsMessage
}

export type TextMessage = {
    type: "text"
    text: string
}

export type ImageMessage = {
    type: "image"
    image: string
}

export type VideoMessage = {
    type: "video"
    video: {
        title: string
        description: string
        previewImage: string
        videoUrl: string
    }
}

export type AudioMessage = {
    type: "audio"
    audio: {
        audioUrl: string
        duration: number
    }
}

export type LocationMessage = {
    type: "location"
    location: {
        title: string
        address: string
        latitude: number
        longitude: number
    }
}

export type StickerMessage = {
    type: "sticker"
    sticker: {
        packageId: string
        stickerId: string
    }
}

export type TemplateMessage = {
    type: "template"
    description: string
    template: TemplateContent
}

export type ImageMapMessage = {
    type: "imageMap"
    imageMap: {
        image: string
        description: string
        width: number
        height: number
        actions: ImageMapAction[]
    }
}

export type NewsMessage = {
    type: "news"
    columns: {
        title: string
        description: string
        url: string
        image: string
    }[]
}
