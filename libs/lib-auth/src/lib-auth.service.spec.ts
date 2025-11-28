import { Test, TestingModule } from '@nestjs/testing';
import { LibAuthService } from './lib-auth.service';

describe('LibAuthService', () => {
  let service: LibAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibAuthService],
    }).compile();

    service = module.get<LibAuthService>(LibAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
