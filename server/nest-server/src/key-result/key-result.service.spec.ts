import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { KeyResultService } from './key-result.service';

describe('KeyResultService', () => {
  let prismaService: DeepMockProxy<PrismaService>;
  let keyResultService: KeyResultService;

  prismaService = mockDeep<PrismaService>();

  beforeEach(async () => {
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
      // arrange
      prismaService.keyResult.createMany.mockResolvedValue({
        count: 1,
      });
      // act
      await keyResultService.createAll(mockKeyResults);
      // assert
      expect(prismaService.keyResult.createMany).toHaveBeenCalledWith({
        data: mockKeyResults,
      });
    });
    it('should return count of created key results with given keyResults', async () => {
      // arrange
      prismaService.keyResult.createMany.mockResolvedValue({
        count: 1,
      });
      // act
      const response = await keyResultService.createAll(mockKeyResults);
      // assert
      expect(response).toEqual({
        count: 1,
      });
    });
  });
});
