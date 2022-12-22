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

  // mensaje de acceso al users root
  @Get()
  getMessage(): string {
    return this.customerService.getCustomerMessage();
  }

  // creacion de nuevo customer
  @Post('newCustomer')
  create(@Body() customerDto: CustomerDto) {
    return this.customerService.create(customerDto);
  }

  // listado de todos los usuarios
  @Get('list')
  findAll() {
    return this.customerService.findAll();
  }

  // busqueda de un usuario por ID
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  // modificacion de todos los datos del usuario
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateCustomerDto: CustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  // eliminacion del usuario que coincida con el ID
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
