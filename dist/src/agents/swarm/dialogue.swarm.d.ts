import { DialogueTranscript, SwarmResolution, CollectiveInsight } from './dialogue.types';
export declare function commune(agentA: string, agentB: string): Promise<DialogueTranscript[]>;
export declare function negotiate(agentA: string, agentB: string, question: string): Promise<SwarmResolution>;
export declare function transmitCollective(agentIds: string[], swarmTag: string): Promise<CollectiveInsight>;
