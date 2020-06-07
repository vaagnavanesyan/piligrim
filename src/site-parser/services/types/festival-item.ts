import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class FestivalItem {
  @Field() title: string;
  @Field() nomination: string;
}
