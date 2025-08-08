import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrganizerInput } from './dto/create-organizer.input';
import { UpdateOrganizerInput } from './dto/update-organizer.input';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class OrganizerService {
  constructor(private readonly prisma: PrismaService) {}
  create(createOrganizerInput: CreateOrganizerInput) {
    return 'This action adds a new organizer';
  }

  async findAll() {
    /**
     * Returns all organizers from the db
     * @returns - JSON object containning all organizers
     */
    try {
      const allOrganizers = await this.prisma.organizer.findMany();
      if (!allOrganizers) return 'No organizer found';
      return allOrganizers.map(organizer => ({
        ...organizer,
        role: Role[organizer.role as  keyof typeof Role] // This converts "ORGANIZER" string to Role.ORGANIZER enum
      }));
    } catch (error) {
      console.error(`Error fetching all organizers: ${error}`);
    }
  }

  async findOne(id: string) {
    /**
     * Finds and returns an organizer identified by an id
     * @param id -ID of the organizer
     */

    try {
      const organizer = await this.prisma.organizer.findUnique({
        where:{
          id
        }
      })
    } catch (error) {
      console.error(`Error fetchig organizer with id ${id}: ${error}`)
    }
  }

  update(id: number, updateOrganizerInput: UpdateOrganizerInput) {
    return `This action updates a #${id} organizer`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizer`;
  }
}
