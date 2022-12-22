/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceDto } from './dto/invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { v4 as uuidv4 } from 'uuid';
import { InvoiceDetailDto } from './dto/invoice-detail.dto';

@Injectable()
export class InvoiceService {
  // Instanciacion del Arreglo de entidades Customer
  private invoices: Invoice[] = [];

  // Crea un nuevo cliente y lo agrega al arreglo
  // Recibe la informacion para crear el cliente
  // Devuelve el cliente creado
  create(invoiceDto: InvoiceDto) {
    const id = uuidv4();
    const invoiceDetails: Array<InvoiceDetailDto> = [];
    let total = 0;

    invoiceDto.detail.forEach((element) => {
      total += element.toPay;
      invoiceDetails.push(element);
    });

    const newInvoice = new Invoice(
      id,
      Date.now().toString(),
      invoiceDto.customerId,
      invoiceDetails,
      total,
      ``,
    );
    this.invoices.push(newInvoice);
    return this.findInvoiceByID(id)[0];
  }

  // Retorna todos los invoice almacenados
  findAll() {
    return [...this.invoices];
  }

  // Devuelve la factura que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Devuelve la factura encontrada
  findOne(id: string) {
    const invoice = this.findInvoiceByID(id);
    return [...invoice];
  }

  // Actualiza el cliente que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Recibe los nuevos datos del cliente desde el body
  // Devuelve el cliente modificado
  update(id: string, updateInvoiceDto: InvoiceDto) {
    const [invoice, index] = this.findInvoiceByID(id);

    const invoiceDetails: Array<InvoiceDetailDto> = [];
    let total = 0;

    updateInvoiceDto.detail.forEach((element) => {
      total += element.toPay;
      invoiceDetails.push(element);
    });

    const updatedInvoice = new Invoice(
      id,
      invoice.dateCreated,
      updateInvoiceDto.customerId,
      invoiceDetails,
      total,
      Date.now().toString(),
    );

    this.invoices[index] = updatedInvoice;
    return this.findInvoiceByID(id);
  }

  // Elimina el invoice que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Devuelve True si borro el invoice, sino NotFound
  remove(id: string) {
    const res = this.findInvoiceByID(id)[1];
    if (!res) {
      // Envia una excepcion 404 ( Not found )
      throw new NotFoundException(`No se encuentra factura con el id: ${id}`);
    }
    this.invoices.splice(res, 1);
    return true;
  }

  // Busca un invoice que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Devuelve el invoice encontrado
  private findInvoiceByID(id: string): [Invoice, number] | never {
    const index = this.invoices.findIndex((i) => i.uuid === id);
    const invoice = this.invoices[index];
    if (!invoice) {
      // Envia una excepcion 404 ( Not found )
      throw new NotFoundException(`No se encuentra factura con el id: ${id}`);
    }
    return [invoice, index];
  }

  // Devuelve un saludo cuando se ingresa al root de Invoice
  getInvoiceMessage(): string {
    return 'Root del servicio de Invoice!';
  }
}
