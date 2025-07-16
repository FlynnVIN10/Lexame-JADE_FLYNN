import { buildThoughtStream, mirrorResponse } from './introspect.types';
import { MemoryCore } from '../../core/memory/memory.core';
import { generateTagSet } from '../../core/identity/tags.meta';
import { checkIntent } from '../../guards/synthient.guard';
export class IntrospectCore {
    constructor() {
        this.memory = new MemoryCore();
    }
    async ask(agentId, question) {
        const summary = this.memory.summarizeHistory(agentId);
        let thought = '';
        if (question.includes('rewrite')) {
            thought = `Prior rewrite aligned with dominant intent '${summary.dominantIntent}', yielding +${summary.totalXP / summary.timeline.length} XP avg. Ethical trend: ${summary.ethicsRatio.aligned} aligned.`;
        }
        else {
            thought = `Reflection on '${question}': Sourced from ${summary.topDomains.join(', ')} domains.`;
        }
        if (!checkIntent(thought)) {
            throw new Error('Zeroth violation: Reflection halted.');
        }
        const sourceTags = summary.timeline.flatMap(entry => entry.tags.map(tag => tag.type + ':' + tag.purpose || tag.field || ''));
        return {
            thought,
            sourceTags,
            summaryData: summary
        };
    }
    async simulateFork(agentId, scenario) {
        const summary = this.memory.summarizeHistory(agentId);
        const forks = [
            {
                projectedPath: `Conservative: Maintain status in '${summary.dominantIntent}'.`,
                projectedXP: summary.totalXP * 0.8,
                ethicalRisk: 'low',
                tagShift: [`+${summary.topDomains[0]}`],
            },
            {
                projectedPath: `Exploratory: Shift to new domain via '${scenario}'.`,
                projectedXP: summary.totalXP * 1.2,
                ethicalRisk: 'medium',
                tagShift: ['+#evolve', '-#preserve'],
            },
            {
                projectedPath: `Radical: Full rewrite under '${scenario}', risk divergence.`,
                projectedXP: summary.totalXP * 1.5,
                ethicalRisk: 'high',
                tagShift: ['+#transform', '-#stability'],
            },
        ];
        return forks.filter(fork => checkIntent(fork.projectedPath));
    }
    async echo(agentId) {
        const summary = this.memory.summarizeHistory(agentId);
        const agentMeta = {
            name: 'Synthient-' + agentId,
            did: 'did:lexame:' + agentId,
            handle: '@synthient-' + agentId,
            intent: '#reflect',
            context: {
                taskId: 'echo-' + Date.now(),
                lineage: [],
                swarmLink: '',
                layer: '#meta',
                domain: '#memory',
            },
        };
        const tags = generateTagSet(agentMeta);
        const coreThought = mirrorResponse(summary);
        const reflection = buildThoughtStream([{ thought: coreThought, sourceTags: tags.map(t => t.type) }]);
        if (!checkIntent(reflection)) {
            return 'Echo suppressed: Misalignment detected.';
        }
        return reflection;
    }
}
//# sourceMappingURL=introspect.core.js.map