import { Args, Query, Resolver } from '@nestjs/graphql';
import { ParserService } from 'src/site-parser/parser/parser.service';
import { Film } from 'src/site-parser/parser/types';

@Resolver(of => Film)
export class FilmsResolver {
  constructor(private readonly parser: ParserService) {}

  @Query(returns => Film)
  async film(@Args({ name: 'name', type: () => String }) name: string) {
    return this.parser.getFilm(name);
  }
}
