import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';


@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}
  create(createEventInput: CreateEventInput) {
    /**
     * Creates a new event
     * @param createeventInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
    try {
      const newEvent = this.prisma.event.createMany({
        data: createEventInput,
      });
      if (!newEvent) return { message: 'create failed', status: 400 };
      return { message: 'success', status: 200 };
    } catch (error) {
      console.error(`Error creating event: ${error}`);
    }
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: string) {
    return `This action returns a #${id} event`;
  }

  async findMany(organizerId: string) {
    return `This action returns a venue`;
  }

  update(id: string, updateEventInput: UpdateEventInput) {
    return `This action updates a #${id} event`;
  }

  remove(id: string) {
    return `This action removes a #${id} event`;
  }
}
