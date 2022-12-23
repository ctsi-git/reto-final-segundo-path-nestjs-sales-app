/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDto } from './dto/customer.dto';
import { Customer } from './entities/customer.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomerService {
  // Instanciacion del Arreglo de entidades Customer
  private customers: Customer[] = [];

  // Crea un nuevo cliente y lo agrega al arreglo
  // Recibe la informacion para crear el cliente
  // Devuelve el cliente creado
  create(customerDto: CustomerDto) {
    const id = uuidv4();
    const newCustomer = new Customer(
      id,
      customerDto.nombre,
      customerDto.apellido,
      customerDto.telefono,
      customerDto.email,
    );
    this.customers.push(newCustomer);
    return this.findCustomerByID(id)[0];
  }

  // Retorna todos los clientes almacenados
  findAll() {
    return [...this.customers];
  }

  // Devuelve el cliente que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Devuelve el cliente encontrado
  findOne(id: string) {
    const customer = this.findCustomerByID(id)[0];
    return [customer];
  }

  // Actualiza el cliente que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Recibe los nuevos datos del cliente desde el body
  // Devuelve el cliente modificado
  update(id: string, customerDto: CustomerDto) {
    const [customer, index] = this.findCustomerByID(id);
    const newCustomer = new Customer(
      id,
      customerDto.nombre,
      customerDto.apellido,
      customerDto.telefono,
      customerDto.email,
    );
    this.customers[index] = newCustomer;
    return newCustomer;
  }

  //TODO: agregar updates de nombre, apellido, telefono, mail

  // Elimina el cliente que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Devuelve True si borro el cliente, sino NotFound
  remove(id: string) {
    const res = this.findCustomerByID(id)[1];
    this.customers.splice(res, 1);
    return true;
  }

  // Busca un customer que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Devuelve el customer encontrado
  private findCustomerByID(id: string): [Customer, number] | never {
    const index = this.customers.findIndex((c) => c.uuid === id);
    const customer = this.customers[index];
    if (!customer) {
      // Envia una excepcion 404 ( Not found )
      throw new NotFoundException(`No se encuentra cliente con el id: ${id}`);
    }
    return [customer, index];
  }

  // Devuelve un saludo cuando se ingresa al root de usuarios
  getCustomerMessage(): string {
    return 'Root del servicio de Customer!';
  }
}
