import { Adapter } from '../interface';
import { Config, IntegrationMessage } from '../model';
export declare class LineClient extends Adapter {
    private client;
    constructor(config: Config, serviceName?: string);
    send(message: IntegrationMessage): Promise<any>;
}
