import { Test, TestingModule } from '@nestjs/testing';

import { SiteParserModule } from '../../../site-parser/site-parser.module';
import { FilmsResolver } from './films.resolver';

describe('FilmsResolver', () => {
  let resolver: FilmsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SiteParserModule],
      providers: [FilmsResolver],
    }).compile();

    resolver = module.get<FilmsResolver>(FilmsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
