import { UseGuards } from '@nestjs/common';
import { SeatService } from './seat.service';
import { Seat } from './entities/seat.entity';
import { HoldingInfo } from './entities/reserved.entity';
import { CreateSeatInput } from './dto/create-seat.input';
import { UpdateSeatInput } from './dto/update-seat.input';
import { ReserveSeatInput } from './dto/reserve-seat.input';
import { OrganizerGuard } from 'src/guards/roles/organizer.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

@Resolver(() => Seat)
export class SeatResolver {
  constructor(private readonly seatService: SeatService) {}

  @Mutation(() => [Seat])
  @UseGuards(OrganizerGuard)
  createSeats(
    @Args('createSeatInput', { type: () => [CreateSeatInput] })
    createSeatInput: [CreateSeatInput],
  ) {
    return this.seatService.create(createSeatInput);
  }

  @Query(() => [Seat], { name: 'seats' })
  findAll() {
    return this.seatService.findAll();
  }

  @Query(() => Seat, { name: 'seat' })
  findOne(@Args('id') id: string) {
    return this.seatService.findOne(id);
  }

  @Mutation(() => HoldingInfo)
  reserveSeats(@Args('reserveSeatinput') reserveSeatInput: ReserveSeatInput) {
    return this.seatService.reserveSeats(reserveSeatInput);
  }

  @UseGuards(OrganizerGuard)
  @Mutation(() => Seat)
  updateSeat(@Args('updateSeatInput') updateSeatInput: UpdateSeatInput) {
    return this.seatService.update(updateSeatInput.id, updateSeatInput);
  }

  @UseGuards(OrganizerGuard)
  @Mutation(() => Seat)
  removeSeat(@Args('id', { type: () => Int }) id: number) {
    return this.seatService.remove(id);
  }
}
