import { parse } from '@typescript-eslint/parser';
import { generateTagSet } from '../../core/identity/tags.meta';
import { checkIntent } from '../../guards/synthient.guard';
import { formatProposal, simulatePetalsResponse, logTrainingCycle } from './petals.bridge';
export class TrainLoop {
    async reflect(agentId) {
        const codebase = `// Sample agent code\n function outdatedFn() { /* inefficient loop */ for(let i=0; i<100000; i++) {} }\n function efficientFn() { /* optimized */ }`;
        const ast = parse(codebase, { sourceType: 'module' });
        const flagged = [];
        ast.body.forEach((node) => {
            if (node.type === 'FunctionDeclaration' && node.body.body.some((stmt) => stmt.type === 'ForStatement')) {
                flagged.push(node.id.name);
            }
        });
        return flagged;
    }
    async proposeRewrite(agentMeta, functionName) {
        const originalCode = `// original code for ${functionName}`;
        const proposedCode = `// improved code for ${functionName}`;
        const rationale = `Refactored ${functionName} for clarity and performance.`;
        const tags = generateTagSet(agentMeta);
        return {
            agentId: agentMeta.name,
            functionName,
            originalCode,
            proposedCode,
            rationale,
            tags
        };
    }
    async sendToPetals(proposal) {
        const request = formatProposal(proposal);
        const response = await simulatePetalsResponse(request);
        await logTrainingCycle(proposal.agentId, response);
        return response;
    }
    async applyIfAllowed(response) {
        if (response.ethicalRating === 'reject')
            return false;
        if (!checkIntent(response.notes?.join(' ') || ''))
            return false;
        console.log(`Applying rewrite: ${response.rewrittenCode}`);
        return true;
    }
}
//# sourceMappingURL=train.loop.js.map