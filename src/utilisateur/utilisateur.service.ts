import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from '../entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { CreateUtilisateurZodDto } from './dto/createUtilisateurZod.dto';
import { UpdateUtilisateurDto } from './dto/updateUtilisateur.dto';
import { LoginUtilisateurDto } from './dto/LoginUtilisateur.dto';
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

  async login(dto: LoginUtilisateurDto) {
    const utilisateur = await this.utilisateurRepo.findOne({
      where: { email: dto.email },
    });
    if (!utilisateur) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = dto.password === utilisateur.password;
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return utilisateur;
  }
}
