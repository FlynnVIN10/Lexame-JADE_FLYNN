import { TagBundle } from '../../core/identity/tags.meta';
export declare function calculateXP(tags: TagBundle): number;
export declare function applyXP(agentId: string, amount: number): {
    xp: number;
    levelDelta: number;
};
export declare function getLevel(agentId: string): string;
