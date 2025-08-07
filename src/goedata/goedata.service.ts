import { Injectable } from '@nestjs/common';
import { CreateGoedatumInput } from './dto/create-goedatum.input';
import { UpdateGoedatumInput } from './dto/update-goedatum.input';

@Injectable()
export class GoedataService {
  create(createGoedatumInput: CreateGoedatumInput) {
    return 'This action adds a new goedatum';
  }

  findAll() {
    return `This action returns all goedata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} goedatum`;
  }

  update(id: number, updateGoedatumInput: UpdateGoedatumInput) {
    return `This action updates a #${id} goedatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} goedatum`;
  }
}
