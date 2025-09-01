import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { SeatStatus } from '@prisma/client';
import { UpdateSeatInput } from './dto/update-seat.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSeatInput } from './dto/create-seat.input';

export interface SeatDto {
  seatNo: number;
  eventId: string;
  status: SeatStatus;
  typeId: string;
  row?: string;
  column?: string;
  holdId?: string;
  holdExpiresAt?: string;
}

interface ReserveSeatDto {
  seatIds: string[];
  eventId: string;
  userId: string;
}

@Injectable()
export class SeatService {
  /**
   * Handles seats creation, reservation and general booking
   * @param prisma -For interaction with database
   */

  //Time till the expirty of each ticket hold
  private readonly HOLDTIME: number = 5 * 60 * 1000;
  constructor(private readonly prisma: PrismaService) {}

  async create(seat: SeatDto[]) {
    /**Create seats for each event
     * @param seat[] -Array of seat objects
     */
    try {
      const seats = await this.prisma.seat.createManyAndReturn({
        data: seat,
      });
      if (!seats) return [];
      return seats;
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === 'P2002') {
          console.error('A seat with this eventid already exists.');
        } else {
          console.error('A known Prisma error occurred:', error.message);
        }
      }
      console.error(`Error creating seat batches`);
    }
  }

  async reserveSeats(reserveSeatDto: ReserveSeatDto) {
    /**    const seats = await this.prisma.seat.createManyAndReturn({
      data: seat,
    });
    if (!seats) return [];
    return seats;
     * Checks if seats are available and then reserves them
     * @param reserveSeatDto -Object containing seatIds, eventId and userId
     */
    const { seatIds, eventId, userId } = reserveSeatDto;
    return this.prisma.$transaction(
      async (tx) => {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + this.HOLDTIME);

        // finds reserved seats from the event
        const available = await tx.seat.findMany({
          where: {
            id: { in: seatIds },
            eventId: eventId,
            OR: [
              { status: SeatStatus.AVAILABLE },
              {
                status: SeatStatus.RESERVED,
                holdExpiresAt: { lt: now },
              },
            ],
          },
        });

        //check if available, throws error if available is inconsistent with the no of ids passed
        if (available.length !== seatIds.length) {
          throw new Error(`Some seats are not available`);
        }

        //create hold
        const { id } = await tx.hold.create({
          data: {
            userId,
            eventId,
            expiresAt: expiresAt,
          },
        });

        //finally reserve seat
        const { count } = await tx.seat.updateMany({
          where: {
            id: { in: seatIds },
            eventId: eventId,
            OR: [
              { status: SeatStatus.AVAILABLE },
              {
                status: SeatStatus.RESERVED,
                holdExpiresAt: { lt: new Date() },
              },
            ],
          },
          data: {
            status: SeatStatus.RESERVED,
            holdId: id,
            holdExpiresAt: new Date(Date.now() + this.HOLDTIME),
          },
        });

        if (count !== seatIds.length) {
          throw new Error(`Some seats could not be reserved`);
        }
        return { holdId: id };
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  }

  async findAll() {
    /**
     * Finds and returns all available seat
     * @returns JSON object containing all available seat
     */
    const availableSeat = await this.prisma.seat.findMany({});
    return availableSeat;
  }

  async findOne(id: string) {
    /**
     * Finds and returns an seat identified by an id
     * @param id -ID of the seat
     */
    try {
      const seat = await this.prisma.seat.findUnique({
        where: {
          id,
        },
      });
      if (!seat) return [];
      return seat;
    } catch (error) {
      console.error(`Error fetching seat with id ${id}: ${error}`);
    }
  }

  update(id: number, updateSeatInput: UpdateSeatInput) {
    return `This action updates a #${id} seat`;
  }

  remove(id: number) {
    return `This action removes a #${id} seat`;
  }
}
