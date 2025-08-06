import { registerEnumType } from "@nestjs/graphql";

export enum Name {
  VIP,
  REGULAR,
  STUDENT
}

registerEnumType(Name, {
  name: 'Name', 
  description: 'Names of all the ticket tiers'
})