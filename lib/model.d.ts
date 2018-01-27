import { ImageMapAction } from '@line/bot-sdk';
export declare type Config = {
    id: string;
    secret: string;
    accessToken: string;
    callbackToken?: string;
};
export declare type IntegrationMessage = {
    channel: "line" | "wechat" | "messenger";
    receiver: string;
    message: TextMessage | ImageMessage | VideoMessage | AudioMessage | FileMessage | LocationMessage | StickerMessage | TemplateMessage | ImageMapMessage | NewsMessage | QuickReplyMessage | TypingMessage;
};
export declare type TextMessage = {
    type: "text";
    text: string;
};
export declare type ImageMessage = {
    type: "image";
    image: string;
};
export declare type VideoMessage = {
    type: "video";
    video: {
        title?: string;
        description?: string;
        previewImage: string;
        videoUrl: string;
    };
};
export declare type AudioMessage = {
    type: "audio";
    audio: {
        audioUrl: string;
        duration?: number;
    };
};
export declare type LocationMessage = {
    type: "location";
    location: {
        title: string;
        address: string;
        latitude: number;
        longitude: number;
    };
};
export declare type StickerMessage = {
    type: "sticker";
    sticker: {
        packageId: string;
        stickerId: string;
    };
};
export declare type FileMessage = {
    type: "file";
    file: string;
};
export declare type QuickReplyMessage = {
    type: "quickReply";
    title: string;
    elements: {
        type: "text";
        label: string;
        data: string;
    }[];
};
export declare type TypingMessage = {
    type: "typing";
    state: "on" | "off";
};
export declare type TemplateMessage = {
    type: "template";
    description: string;
    template: Template;
};
export declare type ImageMapMessage = {
    type: "imageMap";
    imageMap: {
        image: string;
        description: string;
        width: number;
        height: number;
        actions: ImageMapAction[];
    };
};
export declare type NewsMessage = {
    type: "news";
    columns: {
        title: string;
        description: string;
        url: string;
        image: string;
    }[];
};
export declare type Template = TemplateButton | TemplateConfirm | TemplateCarousel | TemplateImageCarousel;
export declare type TemplateButton = {
    type: "button";
    buttons: Button<{
        label: string;
    }>[];
    title?: string;
    content: string;
    image?: string;
    imageAspectRatio?: "rectangle" | "square";
    imageSize?: "cover" | "contain";
    imageBackgroundColor?: string;
};
export declare type TemplateConfirm = {
    type: "confirm";
    content: string;
    buttons: [Button<{
        label: string;
    }>, Button<{
        label: string;
    }>];
};
export declare type TemplateCarousel = {
    type: "carousel";
    elements: CarouselElement[];
    imageAspectRatio?: "rectangle" | "square";
    imageSize?: "cover" | "contain";
};
export declare type TemplateImageCarousel = {
    type: "imageCarousel";
    elements: ImageElement[];
};
export declare type CarouselElement = {
    image?: string;
    title?: string;
    imageAspectRatio?: "rectangle" | "square";
    imageBackgroundColor?: string;
    content: string;
    buttons: Button<{
        label: string;
    }>[];
    url?: string;
};
export declare type ImageElement = {
    image: string;
    action: Button<{
        label?: string;
    }>;
};
export declare type Button<Label> = (URLButton | PostBackButton | MessageButton | DateTimeButton | PhoneNumberButton | AccountLinkButton) & Label;
export declare type URLButton = {
    type: "url";
    url: string;
};
export declare type PostBackButton = {
    type: "postback";
    data: string;
    text?: string;
};
export declare type MessageButton = {
    type: "message";
    text: string;
};
export declare type DateTimeButton = {
    type: "dateTime";
    date: string;
    mode: "date" | "time" | "datetime";
    initial?: string;
    max?: string;
    min?: string;
};
export declare type PhoneNumberButton = {
    type: "phoneNumber";
    phone: string;
};
export declare type AccountLinkButton = {
    type: "accountLink";
    url: string;
};
