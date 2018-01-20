import { Parser } from '../interface';
import { IntegrationMessage } from '../model';
export declare class LineParser implements Parser {
    constructor();
    format(integrationMessage: IntegrationMessage): Promise<any>;
}
