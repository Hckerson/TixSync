import { registerEnumType } from "@nestjs/graphql";

export enum EventCategory {
  MUSIC = "MUSIC",
  TECH = "TECH",
  SPORT = "SPORT"
}

registerEnumType(EventCategory, {
  name: 'EventCategory', 
  description: 'All categoryies of the event'
})