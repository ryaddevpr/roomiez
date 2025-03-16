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
  address: string ;

  @IsString()
  @IsNotEmpty()
  city: string ;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number ;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  size: number ;

  @IsOptional()
  @IsNumber()
  proprietaire?: number;
}
