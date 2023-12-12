import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MinLength, IsPositive } from 'class-validator';



@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  @MinLength(5)
  title: string;

  @Column({ length: 255, nullable: false })
  @MinLength(5)
  author: string;

  @Column({ type: 'decimal', nullable: false })
  @IsPositive()
  price: number;
}
