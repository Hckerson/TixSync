import { User } from "./user.model";
import { Role } from "src/enums/role.enum";
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export  class TicketType {
  @Field()
  username: string
  
  @Field({nullable: true})
  fullname: string

  @Field(type => Role)
  role: Role

  @Field(type => User)
  user: User

  @Field()
  userId: string
}