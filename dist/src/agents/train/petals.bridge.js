import { v4 as uuidv4 } from 'uuid';
export function formatProposal(proposal) {
    return {
        id: uuidv4(),
        agentId: proposal.agentId,
        code: proposal.proposedCode,
        tags: proposal.tags
    };
}
export async function simulatePetalsResponse(request) {
    return {
        rewrittenCode: request.code,
        trustScore: 0.9,
        ethicalRating: 'aligned',
        notes: ['Stub: auto-approved']
    };
}
export async function logTrainingCycle(agentId, summary) {
    console.log(`[PetalsCycle] Agent=${agentId}`, summary);
}
//# sourceMappingURL=petals.bridge.js.map