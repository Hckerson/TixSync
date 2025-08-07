import { Injectable } from '@nestjs/common';
import { CreateAudienceInput } from './dto/create-audience.input';
import { UpdateAudienceInput } from './dto/update-audience.input';

@Injectable()
export class AudienceService {
  create(createAudienceInput: CreateAudienceInput) {
    return 'This action adds a new audience';
  }

  findAll() {
    return `This action returns all audience`;
  }

  findOne(id: number) {
    return `This action returns a #${id} audience`;
  }

  update(id: number, updateAudienceInput: UpdateAudienceInput) {
    return `This action updates a #${id} audience`;
  }

  remove(id: number) {
    return `This action removes a #${id} audience`;
  }
}
