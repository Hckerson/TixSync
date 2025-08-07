import { Injectable } from '@nestjs/common';
import { CreateTickettypeInput } from './dto/create-tickettype.input';
import { UpdateTickettypeInput } from './dto/update-tickettype.input';

@Injectable()
export class TickettypeService {
  create(createTickettypeInput: CreateTickettypeInput) {
    return 'This action adds a new tickettype';
  }

  findAll() {
    return `This action returns all tickettype`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tickettype`;
  }

  update(id: number, updateTickettypeInput: UpdateTickettypeInput) {
    return `This action updates a #${id} tickettype`;
  }

  remove(id: number) {
    return `This action removes a #${id} tickettype`;
  }
}
