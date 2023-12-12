import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Book } from "./entities/book.entity";
import { CreateBookDto, UpdateBookDto } from "./dto/book.dto";

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async findById(id: number): Promise<Book | undefined> {
    return this.prisma.book.findUnique({ where: { id } });
  }

  async create(dto: CreateBookDto): Promise<Book> {
    try {
      const book = await this.prisma.book.create({ data: dto });
      return book;
    } catch (error) {
      // Log the error or handle it appropriately
      throw new Error("Unable to create the book");
    }
  }

  async update(id: number, dto: UpdateBookDto): Promise<Book | undefined> {
    const existingBook = await this.findById(id);
    
    if (!existingBook) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return this.prisma.book.update({ where: { id }, data: dto });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.book.delete({ where: { id } });
  }
}
