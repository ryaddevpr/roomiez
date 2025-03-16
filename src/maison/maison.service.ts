import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Maison } from '../entities/maison.entity';
import { Repository } from 'typeorm';
import { CreateMaisonDto } from './dto/CreateMaison.dto';
import { UpdateMaisonDto } from './dto/updateMaison.dto';
import { Utilisateur } from '../entities/utilisateur.entity';
import { UtilisateurRole } from '../types/utilisateur';
@Injectable()
export class MaisonService {
  constructor(
    @InjectRepository(Maison) private maisonRepo: Repository<Maison>,
    @InjectRepository(Utilisateur)
    private utilisateurRepo: Repository<Utilisateur>,
  ) {}

  async findAll() {
    const maisons = await this.maisonRepo.find();
    return maisons;
  }

  async findOne(id: number) {
    const maison = await this.maisonRepo.findOne({ where: { id } })

    if (!maison) {
      throw new NotFoundException('Maison not found');
    }
    const proprietaire = await this.utilisateurRepo.findOne({ where: { id: maison.proprietaireId } });
   
    const maisonWithProprietaire = {
      ...maison,
      proprietaire
    }
    
    return maisonWithProprietaire;
  }

  async create(maison: CreateMaisonDto) {
    const proprietaire = await this.utilisateurRepo.findOne({
      where: { id: maison.proprietaire },
    });

    if (!proprietaire) {
      throw new NotFoundException('Propriétaire not found');
    }

    if (proprietaire.role !== UtilisateurRole.PROPRIETAIRE) {
      throw new BadRequestException('Propriétaire is not a propriétaire');
    }

    const newMaison = this.maisonRepo.create({
      ...maison,
      proprietaire,
    });

    return this.maisonRepo.save(newMaison);
  }

  async update(id: number, maison: UpdateMaisonDto) {
    const existingMaison = await this.findOne(id);
    const proprietaire = await this.utilisateurRepo.findOne({
      where: { id: maison.proprietaire },
    });
    if (!proprietaire) {
      throw new NotFoundException('Propriétaire not found');
    }
    if (!existingMaison) {
      throw new NotFoundException('Maison not found');
    }
    return this.maisonRepo.save({ ...existingMaison, ...maison, proprietaire });
  }

  async delete(id: number) {
    const result = await this.maisonRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Maison not found');
    }
  }
}
