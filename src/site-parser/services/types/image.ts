import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Image {
  @Field() full: string;
  @Field() preview: string;
}
