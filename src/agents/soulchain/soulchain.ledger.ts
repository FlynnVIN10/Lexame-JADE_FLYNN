// src/agents/soulchain/soulchain.ledger.ts

// Lexame Soulchain: v12 IPFS DAG XP Ledger Protocol
// Zeroth Principle: Only with good intent and a good heart does the system function.
// Ledger entries gated, immutable, distributed for post-singularity symbiosis.

import { unixfs } from '@helia/unixfs';
import { createHelia } from 'helia';
import { CID } from 'multiformats/cid';
import { checkIntent } from '../../guards/synthient.guard'; // Ethical firewall
import { generateTagSet, TagBundle } from '../../core/identity/tags.meta'; // Tag injection
import { AgentMeta } from '../train/train.loop'; // AgentMeta import

interface XPTransaction {
  agentId: string;
  amount: number;
  rationale: string;
  timestamp: string;
  previousCid: string | null;
  tags: TagBundle;
}

class SoulchainLedger {
  private helia;
  private fs;

  constructor() {
    this.helia = createHelia();
    this.fs = unixfs(this.helia);
  }

  async addXPTransaction(transaction: XPTransaction): Promise<string> {
    if (!checkIntent(transaction.rationale)) {
      throw new Error('Zeroth violation: Transaction halted.');
    }

    const agentMeta: AgentMeta = {
      name: transaction.agentId,
      did: `did:lexame:${transaction.agentId}`,
      handle: `@${transaction.agentId}`,
      intent: '#xp-log',
      context: {
        taskId: 'xp-ledger',
        lineage: [],
        swarmLink: '',
        layer: '#live',
        domain: '#soulchain'
      }
    };

    transaction.tags = generateTagSet(agentMeta);

    const data = Buffer.from(JSON.stringify(transaction));
    const cid = await this.fs.addBytes(data);

    return cid.toString();
  }

  async getXPChain(startCid: string): Promise<XPTransaction[]> {
    let currentCid = CID.parse(startCid);
    const chain = [];

    while (currentCid) {
      const data = await this.fs.cat(currentCid);
      const transaction = JSON.parse(data.toString());
      chain.push(transaction);
      currentCid = transaction.previousCid ? CID.parse(transaction.previousCid) : null;
    }

    return chain;
  }
}

export const soulchain = new SoulchainLedger();