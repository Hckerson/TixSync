import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor (private readonly prisma : PrismaService){}
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll(id: string) {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action returns all user`;
  }

  async findOneByOrgId(orgId: string) {
    /**
     * Finds a single user
     * @param orgId -Id of the user
     * @returns JSON object containing found user
     */
    try {
      const user = await  this.prisma.user.findMany({where:{
        organizer:{
          id: orgId
        }
      }})
      if(!user) return { message: 'fetch failed', data: null };
      return user;
    } catch (error) {
      console.log(`Error fetching user with orgId  ${orgId}: ${error}`);
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
