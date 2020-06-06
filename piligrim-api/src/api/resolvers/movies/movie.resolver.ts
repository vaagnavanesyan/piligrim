import { Args, Query, Resolver } from '@nestjs/graphql';
import { ParserService } from '../../../site-parser/parser/parser.service';
import { Movie } from '../../../site-parser/parser/types';

@Resolver(of => Movie)
export class MovieResolver {
  constructor(private readonly parser: ParserService) {}

  @Query(returns => Movie)
  async movie(@Args({ name: 'name', type: () => String }) name: string) {
    return this.parser.getMovie(name);
  }
}
