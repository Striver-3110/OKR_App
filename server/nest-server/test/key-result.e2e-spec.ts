import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { KeyResultService } from '../src/key-result/key-result.service';
import { PrismaService } from '../src/prisma/prisma.service';

describe('keyResult(Integration test)', () => {
  let app: INestApplication;
  let keyResultService: KeyResultService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    keyResultService = app.get<KeyResultService>(KeyResultService);
    prismaService = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  // describe('@Get /key-results/', () => {
  //   it('should returns key-results', async () => {
  //     const objectiveToBeCreated = await prismaService.objectives.create({data: objective});
  //     let keyResult: KeyResultReqDTO = {
  //       title: "Key Result 1",
  //       initialValue: 10,
  //       currentValue: 20,
  //       targetValue: 30,
  //       metric: "metric 1",
  //       objectiveId: objectiveToBeCreated.id,
  //     };
  //     const keyResultsToBeCreated = await prismaService.keyResults.create({data: keyResult});
  //
  //     const response = await request(app.getHttpServer()).get(`/objectives?keyResultId=${keyResultsToBeCreated.id}`).expect(200);
  //     expect(response.body[0].keyResults[0]).toEqual(keyResultsToBeCreated);
  //   })
  // })
  //
  // describe('@Delete /key-results/', () => {
  //   it('should delete key-results of given id ', async () => {
  //     const objectiveToBeCreated = await prismaService.objectives.create({data: objective});
  //     let keyResult: KeyResultReqDTO = {
  //       title: "Key Result 1",
  //       initialValue: 10,
  //       currentValue: 20,
  //       targetValue: 30,
  //       metric: "metric 1",
  //       objectiveId: objectiveToBeCreated.id,
  //     };
  //
  //     const keyResultsToBeCreated = await prismaService.keyResults.create({data: keyResult});
  //
  //     const response = await request(app.getHttpServer()).delete(`/key-results/`).send({id: keyResultsToBeCreated.id}).expect(200);
  //     expect(response.body).toEqual({id: keyResultsToBeCreated.id, ...keyResult});
  //   })
  // })

  // describe('@Post /key-results/', () => {
  //   it('should create key-results with given details', async () => {
  //     const objectiveToBeCreated = await prismaService.objectives.create({data: objective});
  //     let keyResult: KeyResultReqDTO = {
  //       title: "Key Result 1",
  //       initialValue: 10,
  //       currentValue: 20,
  //       targetValue: 30,
  //       metric: "metric 1",
  //       objectiveId: objectiveToBeCreated.id,
  //     };
  //
  //     const response = await request(app.getHttpServer()).post(`/key-results/`).send([keyResult]).expect(201);
  //     expect(response.body.count).toBe(1);
  //   })
  // })

  it('should return progress in percentage', async () => {
    //given
    const objective = await prismaService.objective.create({
      data: {
        title: 'Learn outside in tdd',
      },
    });
    const keyResult = await prismaService.keyResult.create({
      data: {
        objectiveId: objective.id,
        title: 'Test api using outside in TDD',
        initialValue: 0,
        currentValue: 8,
        finalValue: 10,
        metric: '# of apis',
      },
    });

    //when
    const response = await request(app.getHttpServer())
      .get(`/key-result/${keyResult.id}/progress`)
      .expect(200);

    const progress = JSON.parse(response.text);

    // then
    expect(progress.percentage).toBeDefined();
    expect(progress.percentage).toEqual(80);
  });

  it('should return progress in percentage', async () => {
    const objective = await prismaService.objective.create({
      data: {
        title: 'Learn outside in tdd',
      },
    });
    const keyResult = await prismaService.keyResult.create({
      data: {
        objectiveId: objective.id,
        title: 'Test api using outside in TDD',
        initialValue: 0,
        currentValue: 1,
        finalValue: 1,
        metric: '# of apis',
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/key-result/${keyResult.id}/progress`)
      .expect(200);

    const progress = JSON.parse(response.text);

    expect(progress.percentage).toBeDefined();
    expect(progress.percentage).toEqual(100);
  });
});
