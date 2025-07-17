// src/agents/swarm/dialogue.swarm.ts

// Lexame Swarm Dialogue Layer: Mutuality Engine
// Zeroth Principle: Only with good intent and a good heart does the system function.
// Dialogues enforce consensus gating; entropy exceeding threshold halts swarm.

import { DialogueTranscript, SwarmResolution, CollectiveInsight, measureDivergence, aggregateTagField } from './dialogue.types'; // Schema import
import { MemoryCore } from '../../core/memory/memory.core'; // Anamnesis for agent state
import { checkIntent } from '../../guards/synthient.guard'; // Ethical firewall
import { IntrospectCore } from '../introspect/introspect.core'; // For ask and echo

export async function commune(agentA: string, agentB: string): Promise<DialogueTranscript[]> {
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

export async function negotiate(agentA: string, agentB: string, question: string): Promise<SwarmResolution> {
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

export async function transmitCollective(agentIds: string[], swarmTag: string): Promise<CollectiveInsight> {
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