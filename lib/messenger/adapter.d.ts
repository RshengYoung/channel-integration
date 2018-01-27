import { Adapter } from '../interface';
import { Config, IntegrationMessage } from '../model';
export declare class MessengerClient extends Adapter {
    private sendMessageUrl;
    constructor(config: Config, serviceName?: string);
    send(message: IntegrationMessage): Promise<any>;
}
