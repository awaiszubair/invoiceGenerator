export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  projectName: string;
  items: InvoiceItem[];
  discountRate: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  subtotal: number;
  total: number;
  notes: string;
  logo?: string;
  type: 'invoice' | 'quote';
  currency: string;
}

export const defaultInvoiceData: InvoiceData = {
  invoiceNumber: 'INV-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  fromName: '',
  fromEmail: '',
  fromAddress: '',
  toName: '',
  toEmail: '',
  toAddress: '',
  projectName: '',
  items: [
    { id: '1', description: 'Web Design Services', quantity: 1, price: 1000, total: 1000 }
  ],
  discountRate: 0,
  discountAmount: 0,
  taxRate: 0,
  taxAmount: 0,
  subtotal: 1000,
  total: 1000,
  notes: 'Thank you for your business!',
  type: 'invoice',
  currency: 'Rs.',
};
