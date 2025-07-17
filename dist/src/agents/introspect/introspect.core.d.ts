import { IntrospectiveResponse, ForkResult } from './introspect.types';
export declare class IntrospectCore {
    private memory;
    ask(agentId: string, question: string): Promise<IntrospectiveResponse>;
    simulateFork(agentId: string, scenario: string): Promise<ForkResult[]>;
    echo(agentId: string): Promise<string>;
}
