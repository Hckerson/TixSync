import { registerEnumType } from "@nestjs/graphql";


export enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
}

registerEnumType(SeatStatus, {
  name: 'SeatStatus',
  description: 'Status of the seat'
})