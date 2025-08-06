import { registerEnumType } from "@nestjs/graphql";

export enum EventCategory {
  MUSIC,
  TECH,
  SPORT
}

registerEnumType(EventCategory, {
  name: 'EventCategory', 
  description: 'All categoryies of the event'
})