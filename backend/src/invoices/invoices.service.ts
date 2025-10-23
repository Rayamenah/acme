import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
    constructor(private prisma: PrismaService) { }

    async create(createInvoiceDto: CreateInvoiceDto) {
        const { date, customerName, customerAddress, items } = createInvoiceDto;

        const itemsWithTotals = items.map(item => ({
            ...item,
            lineTotal: item.pricePerUnit * item.quantity,
        }));

        const subtotal = itemsWithTotals.reduce((sum, item) => sum + item.lineTotal, 0);
        const total = subtotal;

        const lastInvoice = await this.prisma.invoice.findFirst({
            orderBy: { id: 'desc' },
        });

        const sequenceNumber = lastInvoice
            ? `INV-${String(parseInt(lastInvoice.sequenceNumber.split('-')[1]) + 1).padStart(3, '0')}`
            : 'INV-001';

        return this.prisma.invoice.create({
            data: {
                sequenceNumber,
                date: new Date(date),
                customerName,
                customerAddress,
                subtotal: Math.round(subtotal * 100) / 100,
                total: Math.round(total * 100) / 100,
                items: {
                    create: itemsWithTotals.map(item => ({
                        productCode: item.productCode,
                        description: item.description,
                        pricePerUnit: Math.round(item.pricePerUnit * 100) / 100,
                        quantity: item.quantity,
                        lineTotal: Math.round(item.lineTotal * 100) / 100,
                    })),
                },
            },
            include: {
                items: true,
            },
        });
    }

    async findAll() {
        return this.prisma.invoice.findMany({
            include: {
                items: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}