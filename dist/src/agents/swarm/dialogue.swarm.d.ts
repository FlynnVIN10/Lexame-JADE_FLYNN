import { DialogueTranscript, SwarmResolution, CollectiveInsight } from './dialogue.types';
export declare function commune(agentA: string, agentB: string): DialogueTranscript[];
export declare function negotiate(agentA: string, agentB: string, question: string): SwarmResolution;
export declare function transmitCollective(agentIds: string[], swarmTag: string): CollectiveInsight;
