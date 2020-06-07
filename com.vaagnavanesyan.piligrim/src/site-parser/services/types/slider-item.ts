import {ObjectType, Field} from 'type-graphql';

@ObjectType()
export class SliderItem {
  @Field() image: string;
  @Field() link: string;
}
