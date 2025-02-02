import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as request from 'supertest';

describe('objective(Integration test)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('should create and return the objective', () => {
    const response = request(app.getHttpServer())
      .post('/objective')
      .send({
        title:
          'lets convey that running server manually and then hitting api is also integration testing not just api testing',
      })
      .expect(201);

    // console.log(response);
  });
});
