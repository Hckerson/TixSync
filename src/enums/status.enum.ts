import { registerEnumType } from "@nestjs/graphql";
export enum Status {
  PENDING,
  SUCCESSFUL,
  FAILED
}
registerEnumType(Status, {
  name: 'Status', 
  description: 'Status of the order'
})
