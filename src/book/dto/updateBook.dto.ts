import { IsNotEmpty, IsString, MinLength, IsNumber, IsPositive } from "class-validator";

export class UpdateBookDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
   title?: string;


   @IsNotEmpty()
   @IsString()
   author?: string;


   @IsNotEmpty()
   @IsNumber()
   @IsPositive()
   price?: number;
} 