import { registerEnumType } from "@nestjs/graphql";


export enum Role {
  ADMIN = "ADMIN",
  ORGANIZER = "ORGANIZER",
  AUDIENCE = "AUDIENCE"
}

registerEnumType(Role, {
  name: 'Role',
  description: "Role assigned to the user"
})