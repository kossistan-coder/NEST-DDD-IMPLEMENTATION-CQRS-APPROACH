import { Test, TestingModule } from '@nestjs/testing';
import { LibCoreService } from './lib-core.service';

describe('LibCoreService', () => {
  let service: LibCoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibCoreService],
    }).compile();

    service = module.get<LibCoreService>(LibCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
