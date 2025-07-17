import { CodeProposal, PetalsResponse } from './petals.bridge';
export interface AgentMeta {
    name: string;
    did: string;
    handle: string;
    intent: string;
    context: {
        taskId: string;
        lineage: string[];
        swarmLink: string;
        layer: '#sandbox' | '#live' | '#meta' | '#training';
        domain: string;
    };
}
export declare class TrainLoop {
    reflect(agentId: string): Promise<string[]>;
    proposeRewrite(agentMeta: AgentMeta, functionName: string): Promise<CodeProposal>;
    sendToPetals(proposal: CodeProposal): Promise<PetalsResponse>;
    applyIfAllowed(response: PetalsResponse): Promise<boolean>;
}
