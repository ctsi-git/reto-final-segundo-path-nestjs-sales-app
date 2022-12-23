/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // mensaje de acceso al clientes root
  @Get()
  getMessage(): string {
    return this.customerService.getCustomerMessage();
  }

  // creacion de nuevo cliente
  @Post('newCustomer')
  create(@Body() customerDto: CustomerDto) {
    return this.customerService.create(customerDto);
  }

  // listado de todos los clientes
  @Get('list')
  findAll() {
    return this.customerService.findAll();
  }

  // busqueda de un cliente por ID
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  // modificacion de todos los datos del cliente
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateCustomerDto: CustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  // eliminacion del cliente que coincida con el ID
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
