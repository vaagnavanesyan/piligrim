import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Film {
  @Field() description: string;
  @Field() name: string;

  @Field() duration: string;
  @Field() genre: string;
  @Field() about: string;
  festivals: Array<{
    title: string;
    nomination: string;
  }>;
  images: Array<{
    full: string;
    preview: string;
  }>;
  @Field() video: string;
  @Field() kinopoiskPage: string;
}
