import { OnApplicationShutdown } from '@nestjs/common';
import { AppService } from './app.service';
export declare class AppController implements OnApplicationShutdown {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): Promise<string>;
    onApplicationShutdown(): Promise<void>;
}
