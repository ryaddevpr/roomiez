import { Body, Controller, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';

import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { ParsedIdPipe } from './pipes/parseIdPipes';
import { UpdateUtilisateurDto } from './dto/updateUtilisateur.dto';
import { LoginUtilisateurDto } from './dto/LoginUtilisateur.dto';
import { CreateUtilisateurZodDto, createUtilisateurZodSchema } from './dto/createUtilisateurZod.dto';
@Controller('utilisateur')
export class UtilisateurController {
  constructor(private utilisateurService: UtilisateurService) {}

  @Get()
  findAll() {
    return this.utilisateurService.findAll();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUtilisateurZodSchema))
  create(@Body() dto: CreateUtilisateurZodDto) {
    return this.utilisateurService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParsedIdPipe) id) {
    return this.utilisateurService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParsedIdPipe) id, @Body() dto: UpdateUtilisateurDto) {
    return this.utilisateurService.update(id, dto);
  }

  @Post('login')
  login(@Body() dto: LoginUtilisateurDto) {
    return this.utilisateurService.login(dto);
  }
}
