import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { CreateUtilisateurZodDto } from './dto/createCustomerZod.dto';
import { UpdateUtilisateurDto } from './dto/updateUtilisateur.dto';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepo: Repository<Utilisateur>,
  ) {}

  async findAll() {
    const utilisateurs = await this.utilisateurRepo.find();
    return utilisateurs;
  }

  async findOne(id: number) {
    const utilisateur = await this.utilisateurRepo.findOne({
      where: { id },
    });
    if (!utilisateur) {
      throw new NotFoundException('Utilisateur not found');
    }
    return utilisateur;
  }

  async create(dto: CreateUtilisateurZodDto) {
    const utilisateur = this.utilisateurRepo.create(dto);
    if (await this.utilisateurRepo.findOne({ where: { email: dto.email } })) {
      throw new BadRequestException('Email already exists');
    }
    return this.utilisateurRepo.save(utilisateur);
  }

  async update(id: number, dto: UpdateUtilisateurDto) {
    const utilisateur = await this.findOne(id);
    if (
      dto.email &&
      (await this.utilisateurRepo.findOne({ where: { email: dto.email } }))
    ) {
      throw new BadRequestException('Email already exists');
    }
    return this.utilisateurRepo.save({ ...utilisateur, ...dto });
  }


  

}
