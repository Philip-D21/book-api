import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Book } from "./entities/book.entity";
import { CreateBookDto } from "./dto/createBook.dto";
import { UpdateBookDto } from "./dto/updateBook.dto";
import { CreateMultipleBooksDto } from "./dto/creatMultipleBook.dto";

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Book[]> {
    try {
      return await this.prisma.book.findMany();
    } catch (error) {
      throw new InternalServerErrorException(`Unable to fetch books: ${error.message}`);
    }
  }

  async findById(id: number): Promise<Book | undefined> {
    try {
      return await this.prisma.book.findUnique({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(`Unable to fetch book by ID: ${error.message}`);
    }
  }

  async create(dto: CreateBookDto): Promise<Book> {
    try {
      const book = await this.prisma.book.create({
        data: {
          title: dto.title,
          author: dto.author,
          price: dto.price,
        },
      });
      return book;
    } catch (error) {
      throw new InternalServerErrorException(`Unable to create the book: ${error.message}`);
    }
  }

  async update(id: number, dto: UpdateBookDto): Promise<Book | undefined> {
    try {
      const existingBook = await this.findById(id);

      if (!existingBook) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }

      return await this.prisma.book.update({ where: { id }, data: dto });
    } catch (error) {
      throw new InternalServerErrorException(`Unable to update the book: ${error.message}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prisma.book.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(`Unable to delete the book: ${error.message}`);
    }
  }

  async createMultiple(dto: CreateMultipleBooksDto): Promise<Book[]> {
    try {
      const books = await Promise.all(dto.books.map(bookDto => this.create(bookDto)));
      return books;
    } catch (error) {
      throw new InternalServerErrorException(`Unable to create multiple books: ${error.message}`);
    }
  }

  async findAllSortedBy(sortBy: string, sortOrder: 'asc' | 'desc'): Promise<Book[]> {
    try {
      const books = await this.prisma.book.findMany({
        orderBy: {
          [sortBy]: sortOrder,
        },
      });
      return books;
    } catch (error) {
      throw new InternalServerErrorException(`Unable to fetch books sorted by ${sortBy}: ${error.message}`);
    }
  }

  async getBooksByPrice(threshold: number): Promise<string[]> {
    try {
      const books = await this.prisma.book.findMany({
        where: {
          price: {
            gt: threshold,
          },
        },
      });
      return books.map((book) => book.title);
    } catch (error) {
      throw new InternalServerErrorException(`Unable to fetch books by price: ${error.message}`);
    }
  }

  async getBooksByIds(bookIds: number[]): Promise<Book[]> {
    try {
      return await this.prisma.book.findMany({
        where: {
          id: {
            in: bookIds,
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Unable to fetch books by IDs: ${error.message}`);
    }
  }
}
