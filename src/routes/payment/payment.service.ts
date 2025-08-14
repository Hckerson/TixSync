import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPaymentInput: CreatePaymentInput) {
    /**
     * Creates a new payment
     * @param createPaymentInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
    try {
      const newPayment = await  this.prisma.payment.create({
        data: createPaymentInput,
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
}
