import { Query, Resolver, Args } from '@nestjs/graphql';
import { DashboardResult } from '../../../site-parser/parser/types';
import { ParserService } from '../../../site-parser/parser/parser.service';

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
