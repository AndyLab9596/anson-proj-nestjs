import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get(':id')
  getCustomer(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    console.log(typeof id);
    const customer = this.customerService.findCustomerById(id);

    if (customer) {
      res.send(customer);
    } else {
      res.status(400).send({ msg: 'Customer not found!' });
    }
  }

  @Get('/search/:id')
  searchCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customerService.findCustomerById(id);
    if (customer) {
      return customer;
    } else throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    this.customerService.createCustomer(createCustomerDto);
  }

  @Get('')
  getAllCustomers() {
    return this.customerService.getCustomers();
  }
}
