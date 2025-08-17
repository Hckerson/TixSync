import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class HoldingInfo{
  @Field()
  holdId: string
}