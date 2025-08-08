import { registerEnumType } from "@nestjs/graphql";

export enum OrderCategory {
  TICKET = "TICKET",
  MERCH = "MERCH"
}

registerEnumType(OrderCategory, {
  name: 'OrderCategory', 
  description: 'Category of the order, e.g(ticket, merch)'
})