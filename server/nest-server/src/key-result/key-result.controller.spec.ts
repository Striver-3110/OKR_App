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
});
