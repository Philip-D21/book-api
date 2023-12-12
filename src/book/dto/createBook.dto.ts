import { IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class  CreateBookDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
   title: string;


   @IsNotEmpty()
   @IsString()
   author: string;


   @IsNotEmpty()
   @IsNumber()
   @IsPositive()
   price: number;
}



