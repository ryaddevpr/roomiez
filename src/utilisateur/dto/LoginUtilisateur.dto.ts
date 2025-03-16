import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsEmail } from 'class-validator';

export class LoginUtilisateurDto {
  @IsEmail()
  @IsNotEmpty()
  email: string = "";

  @IsString()
  @IsNotEmpty()
  password: string = "";
}
