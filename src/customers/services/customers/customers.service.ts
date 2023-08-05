import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'danny@gmail.com',
      name: 'Danny',
    },
    {
      id: 2,
      email: 'adam@gmail.com',
      name: 'Adam',
    },
    {
      id: 3,
      email: 'spencer@gmail.com',
      name: 'Spencer',
    },
  ];

  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  createCustomer(createCustomerDto: CreateCustomerDto) {
    this.customers.push(createCustomerDto);
  }

  getCustomers() {
    return this.customers;
  }
}
