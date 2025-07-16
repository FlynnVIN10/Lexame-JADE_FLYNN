import { Test } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
describe('AppController', () => {
    let appController;
    beforeEach(async () => {
        const app = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();
        appController = app.get(AppController);
    });
    describe('root', () => {
        it('should return "Helia is running"', async () => {
            expect(await appController.getHeliaVersion()).toContain('Helia is running');
            await appController.onApplicationShutdown();
        });
    });
});
//# sourceMappingURL=app.controller.spec.js.map