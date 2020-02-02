import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { SiteParserModule } from '../../site-parser/site-parser.module';

describe('Api Controller', () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SiteParserModule],
      controllers: [ApiController],
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
