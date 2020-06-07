import {Field, ObjectType} from 'type-graphql';
import {FestivalItem} from './festival-item';
import {Image} from './image';
@ObjectType()
export class Movie {
  @Field() description: string;
  @Field() name: string;
  @Field() duration: number;
  @Field() genre: string;
  @Field() about: string;
  @Field(type => [FestivalItem]) festivals: FestivalItem[];
  @Field(type => [Image]) images: Image[];
  @Field() video: string;
  @Field() kinopoiskPage: string;
}
