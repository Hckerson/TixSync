import { Injectable } from '@nestjs/common';
import { Status } from 'src/enums/status.enum';
import { SeatStatus } from 'src/enums/seat-status.enum';
import { HoldStatus } from 'src/enums/hold-status.enum';
import { QrcodeService } from 'src/lib/qr-code.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderCategory } from 'src/enums/orderCategory.enum';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly qrcode: QrcodeService,
  ) {}
  async create(createPaymentInput: CreatePaymentInput) {
    /**
     * Creates a new payment
     * @param createPaymentInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
    try {
      const { amount, orderId, userId, status } = createPaymentInput;
      const newPayment = await this.prisma.payment.create({
        data: {
          amount,
          userId,
          status,
        },
      });
      if (!newPayment) return [];
      return newPayment;
    } catch (error) {
      console.error(`Error creating payment: ${error}`);
    }
  }

  async findAll() {
    /**
     * Returns all payment from the db
     * @returns - JSON object containning all payment
     */
    try {
      const allPayment = await this.prisma.payment.findMany();
      if (!allPayment) return [];
      return allPayment.map((payment) => ({
        ...payment,
      }));
    } catch (error) {
      console.error(`Error fetching all payment: ${error}`);
    }
  }

  async findOne(id: string) {
    /**
     * Finds and returns an payment identified by an id
     * @param id -ID of the payment
     */

    try {
      const payment = await this.prisma.payment.findUnique({
        where: {
          id,
        },
      });
      if (!payment) return [];
      return payment;
    } catch (error) {
      console.error(`Error fetching payment with id ${id}: ${error}`);
    }
  }

  async findOneByOrderId(orderId: string) {
    /**
     * Finds a single payment
     * @param orderId -Id of the payment
     * @returns JSON object containing found payment
     */
    try {
      const payment = await this.prisma.payment.findFirst({
        where: {
          order: {
            id: orderId,
          },
        },
      });
      if (!payment) return [];
      return payment;
    } catch (error) {
      console.log(`Error fetching payment with order Id  ${orderId}: ${error}`);
    }
  }

  // async findOneByEventId(eventId: string) {
  //   /**
  //    * Finds a single payment
  //    * @param eventId -Id of the payment
  //    * @returns JSON object containing found payment
  //    */
  //   try {
  //     const payment = await this.prisma.payment.findFirst({
  //       where: {
  //         event: {
  //           id: eventId,
  //         },
  //       },
  //     });
  //     if (!payment) return [];
  //     return payment;
  //   } catch (error) {
  //     console.log(`Error fetching payment with event Id  ${eventId}: ${error}`);
  //   }
  // }

  async update(id: string, updatePaymentInput: UpdatePaymentInput) {
    /**
     * Update the existing data of an payment
     * @param id -ID of the payment
     * @param updatePaymentInput -New data to be entered
     */
    try {
      const { id: paymentId, orderId, ...rest } = updatePaymentInput;
      const updatedData = await this.prisma.payment.update({
        where: {
          id,
        },
        data: rest,
      });
      if (!updatedData) return [];
      return updatedData;
    } catch (error) {
      console.error(`Error updating payment with id ${id}: ${error}`);
    }
  }

  async remove(id: string) {
    /**
     * Deletes a payment
     * @param id -ID of the payment
     */
    try {
      const deletedPayment = await this.prisma.payment.delete({
        where: {
          id,
        },
      });
      if (!deletedPayment) return [];
      return deletedPayment;
    } catch (error) {
      console.error(`Error deleting payment`);
    }
  }

  async processPaystackWebhook(data: Record<string, any>) {
    /**
     * Processes a paystack webhook
     * @param data -The request body
     */
    const now = new Date();
    try {
      return this.prisma.$transaction(async (tx) => {
        const { metadata, amount } = data;
        const { holdId, itemIds, item, eventId } = metadata;

        const category =
          item.lower() == 'merch' ? OrderCategory.MERCH : OrderCategory.TICKET;

        if (category == 'TICKET') {
          // Get  hold of the seat hold
          const hold = await tx.hold.findUnique({
            where: {
              id: holdId,
            },
          });

          if (!hold) throw new Error('Could find hold for this payment');

          const { expiresAt, userId } = hold;

          //check expiry
          if (expiresAt < now) throw new Error('Hold has expired');

          // Get hold of seats reserved
          const seats = await tx.seat.findMany({
            where: {
              holdId,
            },
          });

          //create order and payment

          // convert amount back to naira
          const nairaEquivalent = amount / 100;
          const order = await tx.order.create({
            data: {
              item: category,
              total: nairaEquivalent,
              itemId: itemIds,
              payment: {
                create: {
                  amount: nairaEquivalent,
                  userId,
                  status: Status.SUCCESSFUL,
                },
              },
            },
          });

          if (!order) throw new Error('Could not create order');

          //create ticket
          const tickets = await tx.ticket.createManyAndReturn({
            data: seats.map((seat) => ({
              eventId: seat.eventId,
              typeId: seat.typeId,
              seatId: seat.id,
              seatNo: seat.seatNo,
              userId: userId,
            })),
          });

          if (!tickets) throw new Error('Could not create tickets');

          await Promise.all(
            tickets.map((ticket) => {
              const qrCode = this.qrcode.generateQrCode(
                `http://localhost:3000/activate/ticket/${ticket.id}`,
              );
              return tx.ticket.update({
                where: {
                  id: ticket.id,
                },
                data: {
                  qrcode: String(qrCode),
                },
              });
            }),
          );


          //update seat
          await tx.seat.updateMany({
            where: {
              holdId,
            },
            data: {
              status: SeatStatus.SOLD,
            },
          });

          //update hold
          await tx.hold.update({
            where: {
              id: holdId,
            },
            data: {
              status: HoldStatus.CONVERTED,
            },
          });

          return tickets;
        } else if (category == 'MERCH') {
        }
      });
    } catch (error) {
      console.error(`Error processing paystack webhook: ${error}`);
    }
  }
}
