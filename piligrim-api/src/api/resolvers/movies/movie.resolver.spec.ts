import { Test, TestingModule } from '@nestjs/testing';

import { SiteParserModule } from '../../../site-parser/site-parser.module';
import { MovieResolver } from './movie.resolver';

describe('MovieResolver', () => {
  let resolver: MovieResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SiteParserModule],
      providers: [MovieResolver],
    }).compile();

    resolver = module.get<MovieResolver>(MovieResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
