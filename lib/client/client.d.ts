import { Adapter } from '../interface';
import { IntegrationMessage } from '../model';
export declare class Client {
    private integrations;
    constructor(integrations?: Adapter[]);
    use(client: Adapter): Client;
    send(message: IntegrationMessage): Promise<any>;
}
