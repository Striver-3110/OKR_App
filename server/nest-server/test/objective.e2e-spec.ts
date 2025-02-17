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
  // describe('@Delete /Objectives/', () => {
  //   it('should delete objective of given id ', async () => {
  //     const createdObjective = await prismaService.objectives.create({data: objective});
  //     const createdObjectiveId = createdObjective.id;
  //
  //     const response = await request(app.getHttpServer()).delete(`/objectives`).send({objectiveId: createdObjectiveId}).expect(200);
  //
  //     expect(response.body).toEqual({...objective, id: createdObjectiveId});
  //   })
  // })
  //
  // describe('@Post /Objectives/', () => {
  //   it('should create objective with given types', async () => {
  //     const response = await request(app.getHttpServer()).post('/objectives/').send(objective);
  //
  //     expect(response.body).toEqual({...objective, id: response.body.id,});
  //   })
  // })
  //
  // describe("@Patch /Objectives/", () => {
  //   it('should update objective title of given objectiveId', async () => {
  //     const createdObjective = await prismaService
  //       .objectives.create({data: objective});
  //     const createdObjectiveId = createdObjective.id;
  //
  //     const objectiveToBeUpdated = {id: createdObjectiveId, objective: "test 2"}
  //     const response = await request(app.getHttpServer()).patch(`/objectives`).send(objectiveToBeUpdated).expect(200);
  //     expect(response.body).toEqual(objectiveToBeUpdated);
  //   });
  // })

  it('should create and return the objective', () => {
    const response = request(app.getHttpServer())
      .post('/objective')
      .send({
        title:
          'lets convey that running server manually and then hitting api is also integration testing not just api testing',
      })
      .expect(201);
  });

});
