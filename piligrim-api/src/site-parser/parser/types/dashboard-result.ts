import { FilmSummary } from './film-summary';
import { ObjectType, Field } from 'type-graphql';
import { SliderItem } from './slider-item';

@ObjectType()
export class DashboardResult {
  @Field(type => [SliderItem]) slider: SliderItem[];
  @Field(type => [FilmSummary]) films: FilmSummary[];
  @Field() isLastPage: boolean;
}
