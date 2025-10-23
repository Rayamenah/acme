export interface InvoiceItem {
    id?: number;
    productCode: string;
    description: string;
    pricePerUnit: number;
    quantity: number;
    lineTotal?: number;
}

export interface Invoice {
    id?: number;
    sequenceNumber?: string;
    date: string;
    customerName: string;
    customerAddress: string;
    subtotal: number;
    total: number;
    items: InvoiceItem[];
    createdAt?: string;
}

export interface CreateInvoiceRequest {
    date: string;
    customerName: string;
    customerAddress: string;
    items: InvoiceItem[];
}