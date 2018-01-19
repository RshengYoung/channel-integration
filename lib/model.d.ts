import { TemplateContent } from '@line/bot-sdk';
export declare type Config = {
    id: string;
    secret: string;
    accessToken: string;
    callbackToken?: string;
};
export declare type IntegrationMessage = {
    channel: "line" | "wechat";
    receiver: string;
    message: [TextMessage | ImageMessage | VideoMessage | AudioMessage | LocationMessage | StickerMessage | TemplateMessage];
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
        title: string;
        description: string;
        previewImage: string;
        videoUrl: string;
    };
};
export declare type AudioMessage = {
    type: "audio";
    audio: {
        audioUrl: string;
        duration: number;
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
        stickerID: string;
    };
};
export declare type TemplateMessage = {
    type: "template";
    description: string;
    template: TemplateContent;
};
