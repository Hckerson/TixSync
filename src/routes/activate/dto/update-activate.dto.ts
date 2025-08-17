import { PartialType } from '@nestjs/swagger';
import { CreateActivateDto } from './create-activate.dto';

export class UpdateActivateDto extends PartialType(CreateActivateDto) {}
