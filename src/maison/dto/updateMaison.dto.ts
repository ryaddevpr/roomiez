import { PartialType } from '@nestjs/mapped-types';
import { CreateMaisonDto } from './CreateMaison.dto';

export class UpdateMaisonDto extends PartialType(CreateMaisonDto) {}
