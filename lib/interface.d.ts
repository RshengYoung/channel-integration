import { IntegrationMessage, Config } from './model';
export declare abstract class Adapter {
    protected config: Config;
    protected parser: Parser;
    constructor(config: Config);
    abstract send(message: IntegrationMessage): Promise<any>;
    abstract serviceName(): string;
}
export interface Parser {
    format(messge: IntegrationMessage): Promise<any>;
}
