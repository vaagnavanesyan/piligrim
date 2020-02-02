import { Query, Resolver, Args } from '@nestjs/graphql';
import { ParserService } from 'src/site-parser/parser/parser.service';
import { DashboardResult } from 'src/site-parser/parser/types';

@Resolver(of => DashboardResult)
export class DashboardResolver {
  constructor(private readonly parser: ParserService) {}

  @Query(returns => DashboardResult)
  async dashboard(
    @Args({ name: 'page', type: () => Number, defaultValue: 0 }) page: number,
  ) {
    return this.parser.getDashboard(page);
  }
}
