import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MaisonService } from './maison.service';
import { CreateMaisonDto } from './dto/CreateMaison.dto';
import { UpdateMaisonDto } from './dto/updateMaison.dto';
import { FormDataRequest } from 'nestjs-form-data';
@Controller('maison')
export class MaisonController {
  constructor(private maisonService: MaisonService) {}

  @Get()
  findAll() {
    return this.maisonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maisonService.findOne(+id);
  }

  @Post()
  @FormDataRequest()
  create(@Body() maison: CreateMaisonDto) {
    return this.maisonService.create(maison);
  }

  @Put(':id')
  @FormDataRequest()
  update(@Param('id') id: string, @Body() maison: UpdateMaisonDto) {
    return this.maisonService.update(+id, maison);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maisonService.delete(+id);
  }
}
