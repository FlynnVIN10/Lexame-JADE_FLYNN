var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import { CID } from 'multiformats/cid';
let AppService = class AppService {
    async getHello() {
        return 'Hello World!';
    }
    async listDirectory(cid) {
        const helia = await createHelia();
        const fs = unixfs(helia);
        const entries = [];
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
};
AppService = __decorate([
    Injectable()
], AppService);
export { AppService };
//# sourceMappingURL=app.service.js.map