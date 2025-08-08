import { Injectable } from '@nestjs/common';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';

@Injectable()
export class AdminService {
  create(createAdminInput: CreateAdminInput) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: string) {
    return `This action returns a #${id} admin`;
  }

  update(id: string, updateAdminInput: UpdateAdminInput) {
    return `This action updates a #${id} admin`;
  }

  remove(id: string) {
    return `This action removes a #${id} admin`;
  }
}
