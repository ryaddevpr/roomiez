import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateMaisonDto {
  @IsString()
  @IsNotEmpty()
  address: string = "";

  @IsString()
  @IsNotEmpty()
  city: string = "";

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number = 0;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  size: number = 0;

  @IsOptional()
  @IsNumber()
  proprietaire?: number;
}
