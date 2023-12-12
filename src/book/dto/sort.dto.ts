// sort-books.dto.ts
import { IsString, IsIn } from 'class-validator';

export class SortBooksDto {
  @IsString()
  @IsIn(['title', 'price'], { message: 'Invalid sorting property' })
  sortBy: 'title' | 'price';

  @IsString()
  @IsIn(['asc', 'desc'], { message: 'Invalid sorting order' })
  sortOrder: 'asc' | 'desc';
}
