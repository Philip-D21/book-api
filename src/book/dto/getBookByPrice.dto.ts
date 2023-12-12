// src/book/dto/getBooksByPrice.dto.ts
import { IsNumber, IsPositive } from 'class-validator';

export class GetBooksByPriceDto {
  @IsNumber()
  @IsPositive()
  threshold: number;
}
