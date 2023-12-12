// src/book/dto/getBooksByIds.dto.ts
import { IsArray, IsNumber, IsPositive } from 'class-validator';

export class GetBooksByIdsDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  bookIds: number[];
}
