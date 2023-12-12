import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookDto} from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { CreateMultipleBooksDto } from './dto/creatMultipleBook.dto';
import { SortBooksDto } from './dto/sort.dto';
import { GetBooksByPriceDto } from './dto/getBookByPrice.dto';
import { GetBooksByIdsDto } from './dto/getBookById.dto';



@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // @Get()
  // findAll(): Promise<Book[]> {
  //   return this.bookService.findAll();
  // }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Book | undefined> {
    return this.bookService.findById(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto): Promise<Book | undefined> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.bookService.delete(id);
  }

  @Post('multiple')
  createMultiple(@Body() createMultipleBooksDto: CreateMultipleBooksDto): Promise<Book[]> {
    return this.bookService.createMultiple(createMultipleBooksDto);
  }

  @Get()
 findAll(@Query() sortBooksDto: SortBooksDto): Promise<Book[]> {
    const { sortBy, sortOrder} = sortBooksDto
    return this.bookService.findAllSortedBy(sortBy, sortOrder);
  }

  @Get('by-price')
  getBooksByPrice(@Query() getBooksByPriceDto: GetBooksByPriceDto): Promise<string[]> {
    const { threshold } = getBooksByPriceDto;
    return this.bookService.getBooksByPrice(threshold);
  }

  @Get('by-ids')
  getBooksByIds(@Query() getBooksByIdsDto: GetBooksByIdsDto): Promise<Book[]> {
    const { bookIds } = getBooksByIdsDto;
    return this.bookService.getBooksByIds(bookIds);
  }
  
}
