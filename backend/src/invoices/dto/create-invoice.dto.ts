import { IsString, IsNotEmpty, IsDateString, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateInvoiceItemDto {
    @IsString()
    @IsNotEmpty()
    productCode: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @Min(0)
    @Transform(({ value }) => parseFloat(value))
    pricePerUnit: number;

    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    quantity: number;
}

export class CreateInvoiceDto {
    @IsDateString()
    date: string;

    @IsString()
    @IsNotEmpty()
    customerName: string;

    @IsString()
    @IsNotEmpty()
    customerAddress: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateInvoiceItemDto)
    items: CreateInvoiceItemDto[];
}