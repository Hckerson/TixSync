import { registerEnumType } from "@nestjs/graphql";

export enum Name {
  VIP = "VIP",
  REGULAR = "REGULAR",
  STUDENT = "STUDENT"
}

registerEnumType(Name, {
  name: 'Name', 
  description: 'Names of all the ticket tiers'
})