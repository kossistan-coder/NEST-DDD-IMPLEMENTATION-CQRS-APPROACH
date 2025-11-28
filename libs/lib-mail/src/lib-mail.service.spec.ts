import { Test, TestingModule } from '@nestjs/testing';
import { LibMailService } from './lib-mail.service';

describe('LibMailService', () => {
  let service: LibMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibMailService],
    }).compile();

    service = module.get<LibMailService>(LibMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
