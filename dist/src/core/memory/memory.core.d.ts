import { MemoryEntry, MemorySummary } from './memory.types';
export declare class MemoryCore {
    recordExperience(agentId: string, event: MemoryEntry): Promise<void>;
    recallByTag(agentId: string, tag: string): MemoryEntry[];
    summarizeHistory(agentId: string): MemorySummary;
}
