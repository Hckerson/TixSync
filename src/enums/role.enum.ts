import { registerEnumType } from "@nestjs/graphql";


export enum Role {
  ADMIN,
  ORGANIZER,
  AUDIENCE
}

registerEnumType(Role, {
  name: 'Role',
  description: "Role assigned to the user"
})