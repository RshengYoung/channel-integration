import { Adapter } from '../interface';
import { Config, IntegrationMessage } from '../model';
export declare class WechatClient extends Adapter {
    private cache;
    private wechatUrl;
    private getTokenUrl;
    private sendMessageUrl;
    private uploadMediaUrl;
    constructor(config: Config);
    send(message: IntegrationMessage): Promise<any>;
    serviceName(): string;
    uploadMedia(type: "image" | "voice" | "video" | "thumb", mediaUrl: string): Promise<string>;
    private getAccessToken();
    private getBuffer(media);
    private formatUrltoMedia(integration);
}
