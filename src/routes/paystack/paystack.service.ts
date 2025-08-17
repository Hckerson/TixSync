import 'dotenv/config';
import axios from 'axios';
import { Request } from 'express';
import { AxiosInstance } from 'axios';
import { createHmac } from 'node:crypto';
import { QueryDto } from './dto/query.dto';
import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class Paystack {
  //contains configuration to make a request to the paystack API
  private options = {
    headers: {},
  };
  private client: AxiosInstance;
  // base url of the paystack API
  private readonly baseUrl: string = 'https://api.paystack.co';
  // paystack secret
  private readonly secret: string = process.env.PAYSTACK_SECRET_KEY || '';
  constructor(private readonly paymentService: PaymentService) {
    this.options.headers = {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    };
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 8_0000,
      headers: this.options.headers,
    });
  }

  async initializePayment(data: PaymentDto) {
    /**
     * Makes request to the paystack API
     * @param data -Request body being set to the paystack api
     * @returns -Response from the paystack API
     */

    try {
      const response = await this.client.post(`/transaction/initialize`, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      }
      console.error(`Error making api request to paystack API: ${error}`);
    }
  }

  async verifyTransaction(referenceId: string) {
    /**
     * verify the status of a transaction using the reference
     * @param referenceId - the reference of the transaction
     * @returns the transaction detail
     */
    try {
      const response = await this.client.get(
        `/transaction/verify/${referenceId}`,
      );
      const { status } = response.data.data;
      if (status == 'success') {
        return { message: 'success', status: 200, data: response.data.data };
      } else {
        return { message: 'failed', status: 400, data: null };
      }
    } catch (error) {
      console.error(
        `Error verifying transaction with reference ${referenceId}: ${error}`,
      );
    }
  }

  async fetchAllTransaction(query: QueryDto) {
    /**
     * Retrieve all transaction carried out by a customer
     * @param customerId - the id of the customer
     * @returns -List of all transaction found
     */
    const endpoint = 'https://api.paystack.co/transaction';
    const url = new URL(endpoint);
    const param = new URLSearchParams(url.search);
    if (query.amount) {
      param.append('amount', query.amount.toString());
    }
    if (query.customer) {
      param.append('customer', query.customer.toString());
    }
    if (query.perPage) {
      param.append('perPage', query.perPage.toString());
    }
    if (query.page) {
      param.append('page', query.page.toString());
    }
    if (query.status) {
      param.append('status', query.status);
    }
    try {
      const response = await axios.get(
        `${endpoint}?${param.toString()}`,
        this.options,
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching all transactions`);
    }
  }

  async fetchTransactionById(id: number) {
    /**
     * Fetch transactional details about a payment
     * @param id -ID of the payment
     * @returns -Details of the payment
     */
    try {
      const result = await this.client.get(`/transaction/${id}`, this.options);
      return result.data.data;
    } catch (error) {
      console.error(`Error fetching transaction with id ${id}: ${error}`);
    }
  }

  async handleWebhook(data: unknown, request: Request) {
    /**
     * Verifies origin and handles webhooks from the paystack API
     * @param data -The request body
     * @param request -The request object to extract headers
     *
     *
     */

    try {
      const hash = createHmac('sha512', this.secret)
        .update(JSON.stringify(data))
        .digest('hex');
      if (hash == request.headers['x-paystack-signature']) {
        // Retrieve the request's body
        const event = request.body;
        // Do something with event

        if (event.event == 'charge.success') {
          try {
            const verified = await this.verifyTransaction(event.data.reference);
            if (verified?.message == 'success') {
              await this.paymentService.processPaystackWebhook(event.data);
            }
          } catch (error) {
            console.error(`Error processing payment`);
          }
          //import payment service that will  hadnle webhook
        }
      }
      return { status: 400 };
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      }
      console.error(error.message);
      console.error(`Error fetching webhook details: ${error}`);
    }
  }
}
