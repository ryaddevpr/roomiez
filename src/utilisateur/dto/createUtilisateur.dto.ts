import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UtilisateurRole } from '../../types/utilisateur';

export class CreateUtilisateurDto {
  @IsString()
  name: string  ;
  @IsEmail()
  email: string ;
  @IsString()
  password: string  ;
  @IsEnum(UtilisateurRole)
  role: UtilisateurRole = UtilisateurRole.PROPRIETAIRE;
}
