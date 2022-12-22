import { InvoiceDetailDto } from '../dto/invoice-detail.dto';

export class Invoice {
  constructor(
    public uuid: string,
    public dateCreated: string,
    public customerId: string,
    public detail: InvoiceDetailDto[],
    public total: number,
    public dateUpdated: string,
  ) {}
}
