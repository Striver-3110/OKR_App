import { Test, TestingModule } from '@nestjs/testing';
import { KeyResultController } from './key-result.controller';
import { KeyResultService } from './key-result.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

describe('KeyResultController', () => {
  let controller: KeyResultController;
  let service: DeepMockProxy<KeyResultService>;

  service = mockDeep<KeyResultService>();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeyResultController],
      providers: [
        {
          provide: KeyResultService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<KeyResultController>(KeyResultController);
    service = module.get<DeepMockProxy<KeyResultService>>(KeyResultService);
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
  const mockObjectiveId = '1';
  const mockKeyResultId = '123';

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createAll', () => {
    it('should be defined', () => {
      expect(controller.createAll).toBeDefined();
    });
    it('should call createAll method of keyResultService with given keyResults', async () => {
      await controller.createAll(mockKeyResults);
      expect(service.createAll).toHaveBeenCalledWith(mockKeyResults);
    });
    it('should return created results', async () => {
      service.createAll.mockResolvedValue({
        count: 1,
      });
      const response = await controller.createAll(mockKeyResults);
      expect(response).toEqual({
        count: 1,
      });
    });
  });
  describe('findByObjectiveId', () => {
    it('should be defined', () => {
      expect(controller.findByObjectiveId).toBeDefined();
    });

    it('should call findByObjectiveId method of keyResultService with given objectiveId', async () => {
      await controller.findByObjectiveId(mockObjectiveId);
      expect(service.findByObjectiveId).toHaveBeenCalledWith(mockObjectiveId);
    });

    it('should return key results for the given objectiveId', async () => {
      const mockResults = [{ id: '1', ...mockKeyResults[0] }];
      service.findByObjectiveId.mockResolvedValue(mockResults);
      const response = await controller.findByObjectiveId(mockObjectiveId);
      expect(response).toEqual(mockResults);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should call findAll method of keyResultService', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return all key results', async () => {
      const mockResults = [{ id: '1', ...mockKeyResults[0] }];
      service.findAll.mockResolvedValue(mockResults);
      const response = await controller.findAll();
      expect(response).toEqual(mockResults);
    });
  });

  describe('delete', () => {
    it('should be defined', () => {
      expect(controller.delete).toBeDefined();
    });

    it('should call delete method of keyResultService with given keyResultId', async () => {
      await controller.delete(mockKeyResultId);
      expect(service.delete).toHaveBeenCalledWith(mockKeyResultId);
    });

    it('should return confirmation of deletion', async () => {
      service.delete.mockResolvedValue({
        ...mockKeyResults[0],
        id: mockKeyResultId,
      });
      const response = await controller.delete(mockKeyResultId);
      expect(response).toEqual({ ...mockKeyResults[0], id: mockKeyResultId });
    });

    it('should return progress in percentage', async () => {
      // given
      const keyResult = {
        id: 'FAKE_KEY_RESULT_ID',
        title: 'Dummy KR',
        initialValue: 0,
        currentValue: 2,
        finalValue: 10,
        metric: 'number',
      };
       service.progress.mockReturnValue({ percentage: 20 });
      //when
      const response = await controller.progress(keyResult.id);
      //then
      // console.log(response);
      expect(service.progress).toHaveBeenCalledWith(keyResult.id);
      expect(response.percentage).toEqual(20);
    });
  });
});
