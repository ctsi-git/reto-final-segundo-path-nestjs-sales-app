import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceDto } from './dto/invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  // mensaje de acceso al invoice root
  @Get()
  getMessage(): string {
    return this.invoiceService.getInvoiceMessage();
  }

  // creacion de nueva factura
  @Post('newInvoice')
  create(@Body() invoiceDto: InvoiceDto) {
    return this.invoiceService.create(invoiceDto);
  }

  // listado de todas las facturas almacenadas
  @Get('list')
  findAll() {
    return this.invoiceService.findAll();
  }

  // busqueda de una factura por ID
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }

  // modificacion de todos los datos de la factura
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: InvoiceDto) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  // eliminacion de la factura que coincida con el ID
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(id);
  }
}
