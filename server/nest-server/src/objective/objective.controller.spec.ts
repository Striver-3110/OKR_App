import { Test, TestingModule } from '@nestjs/testing';
import { ObjectiveController } from './objective.controller';
import { ObjectiveService } from './objective.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('ObjectiveController', () => {
  let controller: ObjectiveController;
  let service: DeepMockProxy<ObjectiveService>;

  beforeEach(async () => {
    service = mockDeep<ObjectiveService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjectiveController],
      providers: [
        {
          provide: ObjectiveService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<ObjectiveController>(ObjectiveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const mockObjective = { title: 'Increase Revenue' };

    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should call create method of objectiveService with given objective', async () => {
      await controller.create(mockObjective);
      expect(service.create).toHaveBeenCalledWith(mockObjective);
    });

    it('should return the created objective', async () => {
      const mockResponse = { id: '1', ...mockObjective };
      service.create.mockResolvedValue(mockResponse);
      const response = await controller.create(mockObjective);
      expect(response).toEqual(mockResponse);
    });
  });

  describe('getAll', () => {
    it('should be defined', () => {
      expect(controller.getAll.bind(controller.getAll())).toBeDefined();
    });

    it('should call getAll method of objectiveService', async () => {
      await controller.getAll();
      expect(service.getAll).toHaveBeenCalled();
    });

    it('should return all objectives', async () => {
      const mockObjectives = [
        { id: '1', title: 'Increase Revenue' },
        { id: '2', title: 'Expand Market' },
      ];
      service.getAll.mockResolvedValue(mockObjectives);
      const response = await controller.getAll();
      expect(response).toEqual(mockObjectives);
    });
  });

  describe('delete', () => {
    const mockObjectiveId = '1';

    it('should be defined', () => {
      expect(controller.delete).toBeDefined();
    });

    it('should call delete method of objectiveService with given objectiveId', async () => {
      await controller.delete(mockObjectiveId);
      expect(service.delete).toHaveBeenCalledWith(mockObjectiveId);
    });

    it('should return confirmation of deletion', async () => {
      const mockResponse = { id: mockObjectiveId, title: 'Increase Revenue' };
      service.delete.mockResolvedValue(mockResponse);
      const response = await controller.delete(mockObjectiveId);
      expect(response).toEqual(mockResponse);
    });
  });
});
