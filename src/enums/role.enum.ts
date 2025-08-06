import { registerEnumType } from "@nestjs/graphql";
import { register } from "module";

export enum Role {
  ADMIN,
  ORGANIZER,
  AUDIENCE
}

registerEnumType(Role, {
  name: 'Role',
  description: "Role assigned to the user"
})