import { MovieSummary } from './movie-summary';
import { ObjectType, Field } from 'type-graphql';
import { SliderItem } from './slider-item';

@ObjectType()
export class DashboardResult {
  @Field(type => [SliderItem]) slider: SliderItem[];
  @Field(type => [MovieSummary]) movies: MovieSummary[];
  @Field() isLastPage: boolean;
}
