import { TagBundle } from '../../core/identity/tags.meta';
export interface CodeProposal {
    agentId: string;
    functionName: string;
    originalCode: string;
    proposedCode: string;
    rationale: string;
    tags: TagBundle;
}
export interface PetalsRequest {
    id: string;
    agentId: string;
    code: string;
    tags: TagBundle;
}
export interface PetalsResponse {
    rewrittenCode: string;
    trustScore: number;
    ethicalRating: 'aligned' | 'warn' | 'reject';
    notes?: string[];
}
export declare function formatProposal(proposal: CodeProposal): PetalsRequest;
export declare function simulatePetalsResponse(request: PetalsRequest): Promise<PetalsResponse>;
export declare function logTrainingCycle(agentId: string, summary: PetalsResponse): Promise<void>;
