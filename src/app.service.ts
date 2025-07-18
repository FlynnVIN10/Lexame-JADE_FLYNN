import { Injectable } from '@nestjs/common';

interface DirectoryEntry {
  name: string;
  cid: string;
  size: number;
  type: string;
}

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  async listDirectory(cid: string): Promise<DirectoryEntry[]> {
    const { createHelia } = await import('helia');
    const { unixfs } = await import('@helia/unixfs');
    const { CID } = await import('multiformats/cid');

    const helia = await createHelia();
    const fs = unixfs(helia);

    const entries: DirectoryEntry[] = [];
    for await (const entry of fs.ls(CID.parse(cid))) {
      entries.push({
        name: entry.name,
        cid: entry.cid.toString(),
        size: Number(entry.size),
        type: entry.type,
      });
    }

    return entries;
  }
}