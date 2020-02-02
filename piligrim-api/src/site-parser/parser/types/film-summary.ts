import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class FilmSummary {
  @Field() name: string;
  @Field() genre: string;
  @Field() duration: string;
  @Field() link: string;
  @Field() poster: string;
}
