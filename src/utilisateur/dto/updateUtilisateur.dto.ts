import { PartialType } from '@nestjs/mapped-types';
import { CreateUtilisateurDto } from './createUtilisateur.dto';

export class UpdateUtilisateurDto extends PartialType(CreateUtilisateurDto) {}
