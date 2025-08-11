import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  create(createOrderInput: CreateOrderInput) {
    /**
     * Creates a new order
     * @param createOrderInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
    try {
      const { payment, ...rest } = createOrderInput;
      const neworder = this.prisma.order.create({
        data: rest,
      });
      if (!neworder) return [];
      return neworder;
    } catch (error) {
      console.error(`Error creating order: ${error}`);
    }
  }

  async findAll() {
    /**
     * Returns all orders from the db
     * @returns - JSON object containning all orders
     */
    try {
      const allorders = await this.prisma.order.findMany();
      if (!allorders) return [];
      return allorders.map((orders) => ({
        ...orders,
      }));
    } catch (error) {
      console.error(`Error fetching all orders: ${error}`);
    }
  }

  async findOne(id: string) {
    /**
     * Finds and returns an order identified by an id
     * @param id -ID of the order
     */

    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id,
        },
      });
      if (!order) return [];
      return order;
    } catch (error) {
      console.error(`Error fetching order with id ${id}: ${error}`);
    }
  }

  async findOneByPaymentId(paymentId: string) {
    /**
     * Finds all the orders whose payment id is matches the one provided
     * @param paymentId -ID of the payment
     * @returns JSON object containning all the events
     */
    try {
      const allEvents = await this.prisma.order.findFirst({
        where: {
          payment:{
            id: paymentId
          },
        },
      });
      if (!allEvents) return [];
      return allEvents;
    } catch (error) {
      console.error(
        `Error fetching order with paymnet id : ${paymentId}: ${error}`,
      );
    }
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    /**
     * Update the existing data of an order
     * @param id -ID of the order
     * @param updateorderInput -New data to be entered
     */
    try {
      const { id: orgId, payment, ...rest } = updateOrderInput;
      const updatedData = await this.prisma.order.update({
        where: {
          id,
        },
        data: {
          ...rest,
        },
      });
      if (!updatedData) return [];
      return updatedData;
    } catch (error) {
      console.error(`Error updating orgaizer with id ${id}: ${error}`);
    }
  }

  async remove(id: string) {
    /**
     * Deletes an order
     * @param id -ID of the order
     */
    try {
      const deletedOrder = await this.prisma.order.delete({
        where: {
          id,
        },
      });
      if (!deletedOrder) return [];
      return deletedOrder;
    } catch (error) {
      console.error(`Error deleting order`);
    }
  }
}
