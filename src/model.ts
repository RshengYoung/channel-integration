import { ImageMapAction } from '@line/bot-sdk'

export type Config = {
    id: string
    secret: string
    accessToken: string
    callbackToken?: string
}

export type IntegrationMessage = {
    channel: string//"line" | "wechat" | "messenger"
    receiver: string
    message: TextMessage | ImageMessage | VideoMessage | AudioMessage | FileMessage | LocationMessage | StickerMessage | TemplateMessage | ImageMapMessage | NewsMessage | QuickReplyMessage | TypingMessage
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
        title?: string
        description?: string
        previewImage: string
        videoUrl: string
    }
}

export type AudioMessage = {
    type: "audio"
    audio: {
        audioUrl: string
        duration?: number
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

export type FileMessage = {
    type: "file"
    file: string
}

export type QuickReplyMessage = {           //  Messenger
    type: "quickReply"
    title: string
    elements: {
        type: "text"
        label: string                       //  title
        data: string                        //  payload
    }[]
}

export type TypingMessage = {             //  messenger
    type: "typing"
    state: "on" | "off"
}

export type TemplateMessage = {
    type: "template"
    description: string
    template: Template//TemplateContent
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




//////////////////////////////////////////////////////////////

export type Template = TemplateButton | TemplateConfirm | TemplateCarousel | TemplateImageCarousel

export type TemplateButton = {
    type: "button"
    buttons: Button<{ label: string }>[]
    title?: string                              //  Line
    content: string
    image?: string                              //  Line
    imageAspectRatio?: "rectangle" | "square"   //  Line
    imageSize?: "cover" | "contain"             //  Line
    imageBackgroundColor?: string               //  Line
}

export type TemplateConfirm = {                 //  Line
    type: "confirm"
    content: string
    buttons: [Button<{ label: string }>, Button<{ label: string }>]
}

export type TemplateCarousel = {
    type: "carousel"
    elements: CarouselElement[]
    imageAspectRatio?: "rectangle" | "square"   //  Line
    imageSize?: "cover" | "contain"             //  Line
}

export type TemplateImageCarousel = {
    type: "imageCarousel"
    elements: ImageElement[]
}

export type CarouselElement = {
    image?: string                              //  Messenger require, Line -
    title?: string                              //  Messenger require, Line -
    imageAspectRatio?: "rectangle" | "square"   //  Line
    imageBackgroundColor?: string               //  Line
    content: string
    buttons: Button<{ label: string }>[]
    url?: string                                //  Messenger
}

export type ImageElement = {                     //  Line
    image: string
    action: Button<{ label?: string }>
}

//  Button
export type Button<Label> = (
    URLButton |
    PostBackButton |
    MessageButton |
    DateTimeButton |
    PhoneNumberButton |
    AccountLinkButton
) & Label


export type URLButton = {
    type: "url"
    url: string
}

export type PostBackButton = {
    type: "postback"
    data: string
    text?: string
}

export type MessageButton = {                   //  Line
    type: "message",
    text: string
}

export type DateTimeButton = {                  //  Line
    type: "dateTime"
    date: string
    mode: "date" | "time" | "datetime"
    initial?: string
    max?: string
    min?: string
}

export type PhoneNumberButton = {               //  Messenger
    type: "phoneNumber"
    phone: string
}

export type AccountLinkButton = {            //  Messenger
    type: "accountLink"
    url: string
}