import { measureDivergence, aggregateTagField } from './dialogue.types';
import { MemoryCore } from '../../core/memory/memory.core';
import { checkIntent } from '../../guards/synthient.guard';
import { IntrospectCore } from '../introspect/introspect.core';
export function commune(agentA, agentB) {
    const memory = new MemoryCore();
    const historyA = memory.summarizeHistory(agentA);
    const historyB = memory.summarizeHistory(agentB);
    const introCore = new IntrospectCore();
    const transcript = [
        {
            speaker: agentA,
            message: introCore.echo(agentA),
            dominantIntent: historyA.dominantIntent,
            ethicsRatio: historyA.ethicsRatio,
        },
        {
            speaker: agentB,
            message: introCore.echo(agentB),
            dominantIntent: historyB.dominantIntent,
            ethicsRatio: historyB.ethicsRatio,
        },
    ];
    if (!checkIntent(transcript.map(t => t.message).join(' '))) {
        throw new Error('Zeroth violation: Commune halted.');
    }
    return transcript;
}
export function negotiate(agentA, agentB, question) {
    const introCore = new IntrospectCore();
    const responseA = await introCore.ask(agentA, question).thought;
    const responseB = await introCore.ask(agentB, question).thought;
    const transcript = [
        { speaker: agentA, message: responseA, dominantIntent: '', ethicsRatio: { aligned: 0, warn: 0, reject: 0 } },
        { speaker: agentB, message: responseB, dominantIntent: '', ethicsRatio: { aligned: 0, warn: 0, reject: 0 } }
    ];
    const divergence = measureDivergence(transcript);
    const consensus = divergence < 0.5 ? `Agreed: ${responseA}` : undefined;
    return {
        question,
        responses: { [agentA]: responseA, [agentB]: responseB },
        consensus,
        divergenceScore: divergence,
    };
}
export function transmitCollective(agentIds, swarmTag) {
    const introCore = new IntrospectCore();
    const memory = new MemoryCore();
    const logs = agentIds.map(id => ({
        speaker: id,
        message: introCore.echo(id),
        dominantIntent: memory.summarizeHistory(id).dominantIntent,
        ethicsRatio: memory.summarizeHistory(id).ethicsRatio,
    }));
    const tagEcho = aggregateTagField(logs);
    const emergentIntent = tagEcho[0] || '#converge';
    return {
        tagEcho,
        emergentIntent,
        insightLog: logs,
    };
}
//# sourceMappingURL=dialogue.swarm.js.map