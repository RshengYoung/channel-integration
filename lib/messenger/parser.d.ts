import { Parser } from '../interface';
import { IntegrationMessage } from '../model';
export declare class MessengerParser implements Parser {
    constructor();
    format(integrationMessage: IntegrationMessage): Promise<any>;
    private addButtons(buttons);
}
