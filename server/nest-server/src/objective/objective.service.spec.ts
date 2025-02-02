import { Test, TestingModule } from '@nestjs/testing';
import { ObjectiveService } from './objective.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('ObjectiveService', () => {
  let service: ObjectiveService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObjectiveService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<ObjectiveService>(ObjectiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const mockObjective = { title: 'Increase Revenue' };

    it('should call prisma.objective.create with correct data', async () => {
      await service.create(mockObjective);
      expect(prisma.objective.create).toHaveBeenCalledWith({
        data: mockObjective,
      });
    });

    it('should return the created objective', async () => {
      const mockResponse = { id: '1', ...mockObjective };
      prisma.objective.create.mockResolvedValue(mockResponse);
      const response = await service.create(mockObjective);
      expect(response).toEqual(mockResponse);
    });
  });

  describe('getAll', () => {
    it('should call prisma.objective.findMany with include key_result', async () => {
      await service.getAll();
      expect(prisma.objective.findMany).toHaveBeenCalledWith();
    });

    it('should return all objectives with key results', async () => {
      const mockObjectives = [
        {
          id: '1',
          title: 'Increase Revenue',
          key_result: [{ id: 'kr1', title: 'Increase conversion rate' }],
        },
      ];
      prisma.objective.findMany.mockResolvedValue(mockObjectives);
      const response = await service.getAll();
      expect(response).toEqual(mockObjectives);
    });
  });

  describe('delete', () => {
    const mockObjectiveId = '1';

    it('should call prisma.objective.delete with correct ID', async () => {
      await service.delete(mockObjectiveId);
      expect(prisma.objective.delete).toHaveBeenCalledWith({
        where: { id: mockObjectiveId },
      });
    });

    it('should return the deleted objective', async () => {
      const mockResponse = { id: mockObjectiveId, title: 'Increase Revenue' };
      prisma.objective.delete.mockResolvedValue(mockResponse);
      const response = await service.delete(mockObjectiveId);
      expect(response).toEqual(mockResponse);
    });
  });
});
