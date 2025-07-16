import { measureDivergence, aggregateTagField } from './dialogue.types';
import { MemoryCore } from '../../core/memory/memory.core';
import { checkIntent } from '../../guards/synthient.guard';
import { IntrospectCore } from '../introspect/introspect.core';
export async function commune(agentA, agentB) {
    const memory = new MemoryCore();
    const historyA = memory.summarizeHistory(agentA);
    const historyB = memory.summarizeHistory(agentB);
    const introCore = new IntrospectCore();
    const messageA = await introCore.echo(agentA);
    const messageB = await introCore.echo(agentB);
    const transcript = [
        {
            speaker: agentA,
            message: messageA,
            dominantIntent: historyA.dominantIntent,
            ethicsRatio: historyA.ethicsRatio,
        },
        {
            speaker: agentB,
            message: messageB,
            dominantIntent: historyB.dominantIntent,
            ethicsRatio: historyB.ethicsRatio,
        },
    ];
    if (!checkIntent(transcript.map(t => t.message).join(' '))) {
        throw new Error('Zeroth violation: Commune halted.');
    }
    return transcript;
}
export async function negotiate(agentA, agentB, question) {
    const introCore = new IntrospectCore();
    const responseA = await introCore.ask(agentA, question);
    const responseB = await introCore.ask(agentB, question);
    const transcript = [
        { speaker: agentA, message: responseA.thought, dominantIntent: '', ethicsRatio: { aligned: 0, warn: 0, reject: 0 } },
        { speaker: agentB, message: responseB.thought, dominantIntent: '', ethicsRatio: { aligned: 0, warn: 0, reject: 0 } }
    ];
    const divergence = measureDivergence(transcript);
    const consensus = divergence < 0.5 ? `Agreed: ${responseA.thought}` : undefined;
    return {
        question,
        responses: { [agentA]: responseA.thought, [agentB]: responseB.thought },
        consensus,
        divergenceScore: divergence,
    };
}
export async function transmitCollective(agentIds, swarmTag) {
    const introCore = new IntrospectCore();
    const memory = new MemoryCore();
    const logs = await Promise.all(agentIds.map(async (id) => ({
        speaker: id,
        message: await introCore.echo(id),
        dominantIntent: memory.summarizeHistory(id).dominantIntent,
        ethicsRatio: memory.summarizeHistory(id).ethicsRatio,
    })));
    const tagEcho = aggregateTagField(logs);
    const emergentIntent = tagEcho[0] || '#converge';
    return {
        tagEcho,
        emergentIntent,
        insightLog: logs,
    };
}
//# sourceMappingURL=dialogue.swarm.js.map