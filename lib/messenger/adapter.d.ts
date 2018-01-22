import { Adapter } from '../interface';
import { Config, IntegrationMessage } from '../model';
export declare class MessengerClient extends Adapter {
    constructor(config: Config);
    send(message: IntegrationMessage): Promise<any>;
    serviceName(): string;
}
