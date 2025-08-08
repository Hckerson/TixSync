import { Injectable } from '@nestjs/common';
import { CreateVenueInput } from './dto/create-venue.input';
import { UpdateVenueInput } from './dto/update-venue.input';

@Injectable()
export class VenueService {
  create(createVenueInput: CreateVenueInput) {
    return 'This action adds a new venue';
  }

  findAll() {
    return `This action returns all venue`;
  }

  async findOne(organizerId: string) {
    try {
      
    } catch (error) {
      console.error(`Error fetching : ${error}`);
    }
  }

  async findMany(organizerId: string) {
    return `This action returns a venue`;
  }


  update(id: number, updateVenueInput: UpdateVenueInput) {
    return `This action updates a #${id} venue`;
  }

  remove(id: string) {
    return `This action removes a #${id} venue`;
  }
}
