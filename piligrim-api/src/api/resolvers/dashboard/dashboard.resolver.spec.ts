import { Test, TestingModule } from '@nestjs/testing';

import { SiteParserModule } from '../../../site-parser/site-parser.module';
import { DashboardResolver } from './dashboard.resolver';

describe('DashboardResolver', () => {
  let resolver: DashboardResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SiteParserModule],
      providers: [DashboardResolver],
    }).compile();

    resolver = module.get<DashboardResolver>(DashboardResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
