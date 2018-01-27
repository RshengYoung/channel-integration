import { IntegrationMessage, Config } from './model';
export declare abstract class Adapter {
    protected config: Config;
    protected parser: Parser;
    protected serviceName: string;
    constructor(config: Config, serviceName: string);
    abstract send(message: IntegrationMessage): Promise<any>;
    getServiceName(): string;
}
export interface Parser {
    format(messge: IntegrationMessage): Promise<any>;
}
