import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { KeyResultService } from './key-result.service';

describe('KeyResultService', () => {
  let prismaService: DeepMockProxy<PrismaService>;
  let keyResultService: KeyResultService;

  prismaService = mockDeep<PrismaService>();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      // Set up most of the testing module as we normally would.
      providers: [
        KeyResultService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    prismaService = module.get(PrismaService);
    keyResultService = module.get(KeyResultService);
  });
  const mockKeyResults = [
    {
      title: 'title 1',
      initialValue: 1,
      currentValue: 10,
      finalValue: 100,
      metric: '%',
      objectiveId: '1',
    },
  ];

  describe('createAll()', () => {
    it('should call Prisma createMany with correct key results', async () => {
      prismaService.keyResult.createMany.mockResolvedValue({
        count: 1,
      });
      await keyResultService.createAll(mockKeyResults);
      expect(prismaService.keyResult.createMany).toHaveBeenCalledWith({
        data: mockKeyResults,
      });
    });
    it('should return count of created key results with given keyResults', async () => {
      prismaService.keyResult.createMany.mockResolvedValue({
        count: 1,
      });
      const response = await keyResultService.createAll(mockKeyResults);
      expect(response).toEqual({
        count: 1,
      });
    });
  });

  describe('findAll()', () => {
    it('should call Prisma findMany', async () => {
      await keyResultService.findAll();
      expect(prismaService.keyResult.findMany).toHaveBeenCalledWith();
    });
    it('should return all the keyResults', async () => {
      prismaService.keyResult.findMany.mockResolvedValue([
        { ...mockKeyResults[0], id: '1' },
      ]);
      const response = await keyResultService.findAll();
      expect(response).toEqual([{ ...mockKeyResults[0], id: '1' }]);
    });
  });

  describe('fineOne()', () => {
    it('should call Prisma findOne with given key result id', async () => {
      await keyResultService.findOne('1');
      expect(prismaService.keyResult.findUnique).toHaveBeenCalledWith({
        where: {
          id: '1',
        },
      });
    });
    it('should return the keyResult with given id', async () => {
      prismaService.keyResult.findUnique.mockResolvedValue({
        ...mockKeyResults[0],
        id: '1',
      });
      const response = await keyResultService.findOne('1');
      expect(response).toEqual({ ...mockKeyResults[0], id: '1' });
    });
  });
  describe('findByObjectiveId()', () => {
    it('should call Prisma findMany with given key objective id', async () => {
      await keyResultService.findByObjectiveId('1');
      expect(prismaService.keyResult.findMany).toHaveBeenCalledWith({
        where: {
          objectiveId: '1',
        },
      });
    });
    it('should return the keyResults with given objective id', async () => {
      prismaService.keyResult.findMany.mockResolvedValue([
        {
          ...mockKeyResults[0],
          id: '1',
        },
      ]);
      const response = await keyResultService.findByObjectiveId('1');
      expect(response).toEqual([{ ...mockKeyResults[0], id: '1' }]);
    });
  });
});
