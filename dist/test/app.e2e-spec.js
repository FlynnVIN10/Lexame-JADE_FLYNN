import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
describe('AppController (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    afterEach(async () => {
        await app.close();
    });
    it('/ (GET)', async () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect(/Helia is running/);
    });
});
//# sourceMappingURL=app.e2e-spec.js.map