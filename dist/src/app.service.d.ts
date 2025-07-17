interface DirectoryEntry {
    name: string;
    cid: string;
    size: number;
    type: string;
}
export declare class AppService {
    getHello(): Promise<string>;
    listDirectory(cid: string): Promise<DirectoryEntry[]>;
}
export {};
