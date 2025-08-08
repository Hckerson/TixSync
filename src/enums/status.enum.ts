import { registerEnumType } from "@nestjs/graphql";
export enum Status {
  PENDING = "PENDING",
  SUCCESSFUL = "SUCCESSFUL",
  FAILED = "FAILED"
}
registerEnumType(Status, {
  name: 'Status', 
  description: 'Status of the order'
})
