import { registerEnumType } from "@nestjs/graphql";

export enum OrderCategory {
  TICKET,
  MERCH
}

registerEnumType(OrderCategory, {
  name: 'OrderCategory', 
  description: 'Category of the order, e.g(ticket, merch)'
})