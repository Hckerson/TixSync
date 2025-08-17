import { registerEnumType } from '@nestjs/graphql';

export enum HoldStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CONVERTED = 'CONVERTED',
}

registerEnumType(HoldStatus, {
  name: 'HoldStatus',
  description: 'Varios status the seat hold could be in',
});
