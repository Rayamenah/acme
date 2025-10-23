import { Module } from '@nestjs/common';
import { InvoicesModule } from './invoices/invoices.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [InvoicesModule],
  providers: [PrismaService],
})
export class AppModule { }