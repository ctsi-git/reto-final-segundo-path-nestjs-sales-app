import { InvoiceDetailDto } from './invoice-detail.dto';

export class InvoiceDto {
  dateCreated: string;
  customerId: string;
  detail: InvoiceDetailDto[];
  dateUpdated: string;
}
